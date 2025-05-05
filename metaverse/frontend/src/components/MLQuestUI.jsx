import React, { useState, useEffect } from 'react';
import './MLQuestUI.css';

const MLQuestUI = ({ userId, webSocket }) => {
  const [quests, setQuests] = useState([]);
  const [activeQuest, setActiveQuest] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [response, setResponse] = useState({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newQuest, setNewQuest] = useState({
    name: '',
    description: '',
    quest_type: 'npc_behavior_training',
    difficulty: 1,
    rewards: { experience: 100, tokens: 50 },
    steps: []
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Load available quests when component mounts
  useEffect(() => {
    fetchQuests();
    // Listen for quest-related WebSocket messages
    setupWebSocketListeners();
  }, []);

  const setupWebSocketListeners = () => {
    if (!webSocket) return;

    webSocket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'quest_list') {
        setQuests(data.quests);
      } else if (data.type === 'quest_started') {
        setActiveQuest(data.data.quest_id);
        setCurrentStep(data.data.step_data);
      } else if (data.type === 'quest_step') {
        setCurrentStep(data.data.step_data);
      } else if (data.type === 'quest_completed') {
        showNotification(`Quest completed! You earned ${formatRewards(data.rewards)}`);
        setActiveQuest(null);
        setCurrentStep(null);
        fetchQuests(); // Refresh quest list
      } else if (data.type === 'quest_created') {
        showNotification(`Quest created with ID: ${data.quest_id}`);
        setShowCreateForm(false);
        fetchQuests(); // Refresh quest list
      }
    });
  };

  const fetchQuests = () => {
    setLoading(true);
    
    // Request quests through WebSocket
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(JSON.stringify({
        type: 'quest',
        action: 'get_available'
      }));
    } else {
      // Fallback to REST API if WebSocket is not available
      fetch(`/api/quests?user_id=${userId}`)
        .then(res => res.json())
        .then(data => {
          setQuests(data.quests);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching quests:', err);
          setLoading(false);
        });
    }
  };

  const startQuest = (questId) => {
    setLoading(true);
    
    // Request to start quest through WebSocket
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(JSON.stringify({
        type: 'quest',
        action: 'start',
        quest_id: questId
      }));
    } else {
      // Fallback to REST API
      fetch(`/api/quest/${questId}/start?user_id=${userId}`, {
        method: 'POST'
      })
        .then(res => res.json())
        .then(data => {
          setActiveQuest(questId);
          setCurrentStep(data.step_data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error starting quest:', err);
          setLoading(false);
        });
    }
  };

  const submitQuestStep = () => {
    if (!activeQuest || !currentStep) return;
    
    setLoading(true);
    
    // Submit step response through WebSocket
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(JSON.stringify({
        type: 'quest',
        action: 'submit_step',
        quest_id: activeQuest,
        response: response
      }));
    } else {
      // Fallback to REST API
      fetch(`/api/quest/${activeQuest}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          response: response
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.quest_completed) {
            showNotification(`Quest completed! You earned ${formatRewards(data.rewards)}`);
            setActiveQuest(null);
            setCurrentStep(null);
            fetchQuests();
          } else {
            setCurrentStep(data.step_data);
          }
          setLoading(false);
          setResponse({});
        })
        .catch(err => {
          console.error('Error submitting quest step:', err);
          setLoading(false);
        });
    }
  };

  const createQuest = () => {
    if (newQuest.steps.length === 0) {
      showNotification('Please add at least one step to your quest', 'error');
      return;
    }
    
    setLoading(true);
    
    // Create quest through WebSocket
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(JSON.stringify({
        type: 'quest',
        action: 'create',
        ...newQuest,
        user_id: userId
      }));
    } else {
      // Fallback to REST API
      fetch('/api/quest/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newQuest,
          user_id: userId
        })
      })
        .then(res => res.json())
        .then(data => {
          showNotification(`Quest created with ID: ${data.quest_id}`);
          setShowCreateForm(false);
          fetchQuests();
          setLoading(false);
          
          // Reset form
          setNewQuest({
            name: '',
            description: '',
            quest_type: 'npc_behavior_training',
            difficulty: 1,
            rewards: { experience: 100, tokens: 50 },
            steps: []
          });
        })
        .catch(err => {
          console.error('Error creating quest:', err);
          setLoading(false);
        });
    }
  };

  const addStep = () => {
    const newStep = {
      step_id: `step_${newQuest.steps.length + 1}`,
      description: '',
      task_type: 'text_input',
      data: {}
    };
    
    setNewQuest({
      ...newQuest,
      steps: [...newQuest.steps, newStep]
    });
  };

  const updateStep = (index, field, value) => {
    const updatedSteps = [...newQuest.steps];
    updatedSteps[index][field] = value;
    
    setNewQuest({
      ...newQuest,
      steps: updatedSteps
    });
  };

  const removeStep = (index) => {
    const updatedSteps = newQuest.steps.filter((_, i) => i !== index);
    
    setNewQuest({
      ...newQuest,
      steps: updatedSteps
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResponse({
      ...response,
      [name]: value
    });
  };

  const handleNewQuestChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setNewQuest({
        ...newQuest,
        [parent]: {
          ...newQuest[parent],
          [child]: value
        }
      });
    } else {
      setNewQuest({
        ...newQuest,
        [name]: value
      });
    }
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const formatRewards = (rewards) => {
    return Object.entries(rewards)
      .map(([key, value]) => `${value} ${key}`)
      .join(', ');
  };

  const renderQuestList = () => {
    if (quests.length === 0) {
      return <p>No quests available. Be the first to create one!</p>;
    }
    
    return (
      <div className="quest-list">
        {quests.map(quest => (
          <div key={quest.quest_id} className="quest-card">
            <h3>{quest.name}</h3>
            <div className="quest-difficulty">
              Difficulty: {Array(quest.difficulty).fill('★').join('')}
            </div>
            <p>{quest.description}</p>
            <div className="quest-info">
              <span>Steps: {quest.step_count}</span>
              <span>Rewards: {formatRewards(quest.rewards)}</span>
            </div>
            <button 
              onClick={() => startQuest(quest.quest_id)}
              disabled={loading}
            >
              Start Quest
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderQuestStep = () => {
    if (!currentStep) return null;
    
    return (
      <div className="quest-step">
        <h3>{currentStep.description}</h3>
        
        {currentStep.task_type === 'text_input' && (
          <textarea
            name="text_response"
            placeholder="Enter your response..."
            value={response.text_response || ''}
            onChange={handleInputChange}
          />
        )}
        
        {currentStep.task_type === 'multiple_choice' && (
          <div className="multiple-choice">
            {currentStep.data.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="selected_option"
                  value={option}
                  checked={response.selected_option === option}
                  onChange={handleInputChange}
                />
                {option}
              </label>
            ))}
          </div>
        )}
        
        {currentStep.task_type === 'rating' && (
          <div className="rating">
            <p>Scenario: {currentStep.data.scenario}</p>
            <p>Response: "{currentStep.data.npc_response}"</p>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(rating => (
                <span 
                  key={rating}
                  className={`star ${response.rating >= rating ? 'active' : ''}`}
                  onClick={() => setResponse({ ...response, rating })}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        )}
        
        <button 
          onClick={submitQuestStep}
          disabled={loading}
        >
          Submit
        </button>
      </div>
    );
  };

  const renderCreateForm = () => {
    return (
      <div className="create-quest-form">
        <h3>Create New Quest</h3>
        
        <div className="form-group">
          <label>Quest Name</label>
          <input
            type="text"
            name="name"
            value={newQuest.name}
            onChange={handleNewQuestChange}
            placeholder="Enter quest name..."
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={newQuest.description}
            onChange={handleNewQuestChange}
            placeholder="Enter quest description..."
          />
        </div>
        
        <div className="form-group">
          <label>Quest Type</label>
          <select
            name="quest_type"
            value={newQuest.quest_type}
            onChange={handleNewQuestChange}
          >
            <option value="npc_behavior_training">NPC Behavior Training</option>
            <option value="object_recognition">Object Recognition</option>
            <option value="custom_model">Custom Model</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Difficulty (1-5)</label>
          <input
            type="number"
            name="difficulty"
            min="1"
            max="5"
            value={newQuest.difficulty}
            onChange={handleNewQuestChange}
          />
        </div>
        
        <div className="form-group">
          <label>Rewards</label>
          <div className="reward-inputs">
            <input
              type="number"
              name="rewards.experience"
              placeholder="Experience"
              value={newQuest.rewards.experience}
              onChange={handleNewQuestChange}
            />
            <input
              type="number"
              name="rewards.tokens"
              placeholder="Tokens"
              value={newQuest.rewards.tokens}
              onChange={handleNewQuestChange}
            />
          </div>
        </div>
        
        <h4>Steps</h4>
        {newQuest.steps.length === 0 ? (
          <p>No steps added yet. Add at least one step.</p>
        ) : (
          <div className="steps-list">
            {newQuest.steps.map((step, index) => (
              <div key={index} className="step-item">
                <div className="form-group">
                  <label>Step Description</label>
                  <input
                    type="text"
                    value={step.description}
                    onChange={(e) => updateStep(index, 'description', e.target.value)}
                    placeholder="What should the user do?"
                  />
                </div>
                
                <div className="form-group">
                  <label>Task Type</label>
                  <select
                    value={step.task_type}
                    onChange={(e) => updateStep(index, 'task_type', e.target.value)}
                  >
                    <option value="text_input">Text Input</option>
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
                
                <button 
                  className="remove-step"
                  onClick={() => removeStep(index)}
                >
                  Remove Step
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="form-actions">
          <button onClick={addStep}>Add Step</button>
          <button onClick={createQuest} disabled={loading || newQuest.steps.length === 0}>
            Create Quest
          </button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button>
        </div>
      </div>
    );
  };

  return (
    <div className="ml-quest-ui">
      <div className="quest-header">
        <h2>AI Training Quests</h2>
        {!showCreateForm && !activeQuest && (
          <button onClick={() => setShowCreateForm(true)}>Create New Quest</button>
        )}
        {activeQuest && (
          <button onClick={() => {
            setActiveQuest(null);
            setCurrentStep(null);
          }}>
            Abandon Quest
          </button>
        )}
      </div>
      
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      {loading && <div className="loading-spinner">Loading...</div>}
      
      {!showCreateForm && !activeQuest && renderQuestList()}
      {activeQuest && renderQuestStep()}
      {showCreateForm && renderCreateForm()}
    </div>
  );
};

export default MLQuestUI; 