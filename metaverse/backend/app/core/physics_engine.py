from typing import Dict, Any, List, Optional
from .vector3 import Vector3

class PhysicsEngine:
    def __init__(self):
        self.gravity = -9.81
        self.collision_system = CollisionSystem()
        self.objects = {}  # Physics objects
        self.world_ref = None  # Reference to world engine (set during initialization)
        
    def set_world_reference(self, world_ref):
        """Set reference to the world engine for terrain queries"""
        self.world_ref = world_ref
        
    def register_object(self, obj_id: str, position: Vector3, velocity: Vector3 = None, 
                        mass: float = 1.0, is_static: bool = False, 
                        collider_type: str = "box", collider_size: Vector3 = None) -> 'PhysicsObject':
        """Register an object with the physics system"""
        physics_obj = PhysicsObject(
            obj_id=obj_id,
            position=position,
            velocity=velocity or Vector3(0, 0, 0),
            mass=mass,
            is_static=is_static,
            collider_type=collider_type,
            collider_size=collider_size or Vector3(1, 1, 1)
        )
        
        self.objects[obj_id] = physics_obj
        return physics_obj
        
    def unregister_object(self, obj_id: str):
        """Remove an object from the physics system"""
        if obj_id in self.objects:
            del self.objects[obj_id]
            
    def update(self, delta_time: float):
        """Update all physics objects"""
        # Apply forces and update positions
        for obj in self.objects.values():
            if not obj.is_static:
                self.apply_physics(obj, delta_time)
                
        # Handle collisions
        self.collision_system.resolve_collisions(list(self.objects.values()), self.world_ref)
        
    def apply_physics(self, obj: 'PhysicsObject', delta_time: float):
        """Apply physics to an object"""
        # Apply gravity
        obj.apply_force(Vector3(0, self.gravity * obj.mass, 0))
        
        # Update velocity based on forces
        acceleration = Vector3(
            obj.force.x / obj.mass,
            obj.force.y / obj.mass,
            obj.force.z / obj.mass
        )
        obj.velocity = Vector3(
            obj.velocity.x + acceleration.x * delta_time,
            obj.velocity.y + acceleration.y * delta_time,
            obj.velocity.z + acceleration.z * delta_time
        )
        
        # Update position based on velocity
        obj.position = Vector3(
            obj.position.x + obj.velocity.x * delta_time,
            obj.position.y + obj.velocity.y * delta_time,
            obj.position.z + obj.velocity.z * delta_time
        )
        
        # Check terrain collision
        if self.world_ref:
            terrain_height = self.world_ref.get_terrain_height(obj.position.x, obj.position.z)
            
            if obj.position.y < terrain_height:
                obj.position = Vector3(obj.position.x, terrain_height, obj.position.z)
                # Bounce with some dampening
                obj.velocity = Vector3(
                    obj.velocity.x * 0.8,
                    -obj.velocity.y * 0.5,  # Bounce with dampening
                    obj.velocity.z * 0.8
                )
                
                # If velocity is very small, stop the object
                if abs(obj.velocity.y) < 0.1:
                    obj.velocity = Vector3(obj.velocity.x, 0, obj.velocity.z)
        
        # Reset forces for next frame
        obj.force = Vector3(0, 0, 0)

class PhysicsObject:
    def __init__(self, obj_id: str, position: Vector3, velocity: Vector3, 
                 mass: float, is_static: bool, collider_type: str, collider_size: Vector3):
        self.id = obj_id
        self.position = position
        self.velocity = velocity
        self.force = Vector3(0, 0, 0)
        self.mass = mass
        self.is_static = is_static
        self.collider_type = collider_type
        self.collider_size = collider_size
        
    def apply_force(self, force: Vector3):
        """Apply a force to the object"""
        if not self.is_static:
            self.force = Vector3(
                self.force.x + force.x,
                self.force.y + force.y,
                self.force.z + force.z
            )
            
    def to_dict(self) -> Dict[str, Any]:
        """Convert physics object to dictionary"""
        return {
            "id": self.id,
            "position": self.position.to_dict(),
            "velocity": self.velocity.to_dict(),
            "mass": self.mass,
            "is_static": self.is_static,
            "collider": {
                "type": self.collider_type,
                "size": self.collider_size.to_dict()
            }
        }

class CollisionSystem:
    def __init__(self):
        self.collision_pairs = []
        
    def check_collision(self, obj1: PhysicsObject, obj2: PhysicsObject) -> Optional[Dict[str, Any]]:
        """Check if two objects are colliding"""
        if obj1.id == obj2.id:
            return None
            
        if obj1.collider_type == "box" and obj2.collider_type == "box":
            return self.check_box_collision(obj1, obj2)
        elif obj1.collider_type == "sphere" and obj2.collider_type == "sphere":
            return self.check_sphere_collision(obj1, obj2)
        elif (obj1.collider_type == "box" and obj2.collider_type == "sphere") or \
             (obj1.collider_type == "sphere" and obj2.collider_type == "box"):
            # For mixed collisions, always make obj1 the box and obj2 the sphere
            if obj1.collider_type == "sphere":
                obj1, obj2 = obj2, obj1
            return self.check_box_sphere_collision(obj1, obj2)
            
        return None
            
    def check_box_collision(self, box1: PhysicsObject, box2: PhysicsObject) -> Optional[Dict[str, Any]]:
        """Check collision between two box colliders"""
        # Box half-sizes
        size1 = box1.collider_size
        size2 = box2.collider_size
        
        min1 = Vector3(
            box1.position.x - size1.x/2,
            box1.position.y - size1.y/2,
            box1.position.z - size1.z/2
        )
        max1 = Vector3(
            box1.position.x + size1.x/2,
            box1.position.y + size1.y/2,
            box1.position.z + size1.z/2
        )
        
        min2 = Vector3(
            box2.position.x - size2.x/2,
            box2.position.y - size2.y/2,
            box2.position.z - size2.z/2
        )
        max2 = Vector3(
            box2.position.x + size2.x/2,
            box2.position.y + size2.y/2,
            box2.position.z + size2.z/2
        )
        
        # Check for overlap in all axes
        if (max1.x < min2.x or min1.x > max2.x or
            max1.y < min2.y or min1.y > max2.y or
            max1.z < min2.z or min1.z > max2.z):
            return None  # No collision
            
        # Find the overlap depths in each axis
        overlap_x = min(max1.x - min2.x, max2.x - min1.x)
        overlap_y = min(max1.y - min2.y, max2.y - min1.y)
        overlap_z = min(max1.z - min2.z, max2.z - min1.z)
        
        # Find the axis with the smallest overlap
        if overlap_x <= overlap_y and overlap_x <= overlap_z:
            # X-axis has smallest overlap
            normal = Vector3(1, 0, 0) if box1.position.x < box2.position.x else Vector3(-1, 0, 0)
            penetration = overlap_x
        elif overlap_y <= overlap_x and overlap_y <= overlap_z:
            # Y-axis has smallest overlap
            normal = Vector3(0, 1, 0) if box1.position.y < box2.position.y else Vector3(0, -1, 0)
            penetration = overlap_y
        else:
            # Z-axis has smallest overlap
            normal = Vector3(0, 0, 1) if box1.position.z < box2.position.z else Vector3(0, 0, -1)
            penetration = overlap_z
            
        return {
            "normal": normal,
            "penetration": penetration,
            "obj1": box1,
            "obj2": box2
        }
        
    def check_sphere_collision(self, sphere1: PhysicsObject, sphere2: PhysicsObject) -> Optional[Dict[str, Any]]:
        """Check collision between two sphere colliders"""
        # Calculate distance between spheres
        dx = sphere2.position.x - sphere1.position.x
        dy = sphere2.position.y - sphere1.position.y
        dz = sphere2.position.z - sphere1.position.z
        
        distance_squared = dx*dx + dy*dy + dz*dz
        
        # Sum of radii (assuming size.x is the diameter)
        radius1 = sphere1.collider_size.x / 2
        radius2 = sphere2.collider_size.x / 2
        radii_sum = radius1 + radius2
        
        # Check if spheres are colliding
        if distance_squared >= radii_sum * radii_sum:
            return None  # No collision
            
        # Calculate collision information
        distance = (distance_squared) ** 0.5
        
        # Avoid division by zero
        if distance == 0:
            normal = Vector3(0, 1, 0)  # Arbitrary direction if spheres are at the same position
        else:
            normal = Vector3(dx/distance, dy/distance, dz/distance)
            
        penetration = radii_sum - distance
        
        return {
            "normal": normal,
            "penetration": penetration,
            "obj1": sphere1,
            "obj2": sphere2
        }
        
    def check_box_sphere_collision(self, box: PhysicsObject, sphere: PhysicsObject) -> Optional[Dict[str, Any]]:
        """Check collision between a box and a sphere"""
        # Get the closest point on the box to the sphere center
        box_half_size = box.collider_size
        box_min = Vector3(
            box.position.x - box_half_size.x/2,
            box.position.y - box_half_size.y/2,
            box.position.z - box_half_size.z/2
        )
        box_max = Vector3(
            box.position.x + box_half_size.x/2,
            box.position.y + box_half_size.y/2,
            box.position.z + box_half_size.z/2
        )
        
        # Find the closest point on the box to the sphere
        closest_x = max(box_min.x, min(sphere.position.x, box_max.x))
        closest_y = max(box_min.y, min(sphere.position.y, box_max.y))
        closest_z = max(box_min.z, min(sphere.position.z, box_max.z))
        
        closest_point = Vector3(closest_x, closest_y, closest_z)
        
        # Calculate distance from closest point to sphere center
        dx = closest_point.x - sphere.position.x
        dy = closest_point.y - sphere.position.y
        dz = closest_point.z - sphere.position.z
        
        distance_squared = dx*dx + dy*dy + dz*dz
        
        # Sphere radius
        radius = sphere.collider_size.x / 2
        
        # Check for collision
        if distance_squared >= radius * radius:
            return None  # No collision
            
        # Calculate collision info
        distance = (distance_squared) ** 0.5
        
        # Handle the case when the sphere center is inside the box
        if distance == 0:
            # Find the closest face
            face_distances = [
                abs(sphere.position.x - box_min.x),
                abs(sphere.position.x - box_max.x),
                abs(sphere.position.y - box_min.y),
                abs(sphere.position.y - box_max.y),
                abs(sphere.position.z - box_min.z),
                abs(sphere.position.z - box_max.z)
            ]
            
            min_idx = face_distances.index(min(face_distances))
            
            # Determine normal direction based on closest face
            if min_idx == 0:
                normal = Vector3(-1, 0, 0)
            elif min_idx == 1:
                normal = Vector3(1, 0, 0)
            elif min_idx == 2:
                normal = Vector3(0, -1, 0)
            elif min_idx == 3:
                normal = Vector3(0, 1, 0)
            elif min_idx == 4:
                normal = Vector3(0, 0, -1)
            else:
                normal = Vector3(0, 0, 1)
                
            penetration = radius + min(face_distances)
        else:
            normal = Vector3(dx/distance, dy/distance, dz/distance)
            penetration = radius - distance
            
        return {
            "normal": normal,
            "penetration": penetration,
            "obj1": box,
            "obj2": sphere
        }
        
    def resolve_collisions(self, objects: List[PhysicsObject], world_ref=None):
        """Detect and resolve all collisions in the scene"""
        # Reset collision pairs
        self.collision_pairs = []
        
        # Check for collisions between all objects
        for i, obj1 in enumerate(objects):
            # Check terrain collision if world reference exists
            if world_ref and not obj1.is_static:
                terrain_height = world_ref.get_terrain_height(obj1.position.x, obj1.position.z)
                if obj1.position.y < terrain_height:
                    obj1.position = Vector3(obj1.position.x, terrain_height, obj1.position.z)
                    # Bounce with some dampening
                    obj1.velocity = Vector3(
                        obj1.velocity.x * 0.8,
                        -obj1.velocity.y * 0.5,
                        obj1.velocity.z * 0.8
                    )
            
            # Check object-object collisions
            for j in range(i + 1, len(objects)):
                obj2 = objects[j]
                
                # Skip if both objects are static
                if obj1.is_static and obj2.is_static:
                    continue
                    
                collision = self.check_collision(obj1, obj2)
                if collision:
                    self.collision_pairs.append(collision)
                    self.resolve_collision(collision)
    
    def resolve_collision(self, collision: Dict[str, Any]):
        """Resolve a collision between two objects"""
        obj1 = collision["obj1"]
        obj2 = collision["obj2"]
        normal = collision["normal"]
        penetration = collision["penetration"]
        
        # Skip if both objects are static
        if obj1.is_static and obj2.is_static:
            return
            
        # Calculate relative velocity
        relative_vel_x = obj2.velocity.x - obj1.velocity.x
        relative_vel_y = obj2.velocity.y - obj1.velocity.y
        relative_vel_z = obj2.velocity.z - obj1.velocity.z
        
        # Calculate relative velocity in terms of the normal direction
        velocity_along_normal = (
            relative_vel_x * normal.x +
            relative_vel_y * normal.y +
            relative_vel_z * normal.z
        )
        
        # Do not resolve if velocities are separating
        if velocity_along_normal > 0:
            return
            
        # Calculate restitution (bounce)
        restitution = 0.2  # Could be a property of the objects
        
        # Calculate impulse scalar
        j = -(1 + restitution) * velocity_along_normal
        
        # If both bodies have mass, prepare for impulse calculations
        if not obj1.is_static and not obj2.is_static:
            j /= (1 / obj1.mass) + (1 / obj2.mass)
            
            # Apply impulse
            impulse_x = j * normal.x
            impulse_y = j * normal.y
            impulse_z = j * normal.z
            
            # Apply impulse to velocities
            if not obj1.is_static:
                obj1.velocity = Vector3(
                    obj1.velocity.x - impulse_x / obj1.mass,
                    obj1.velocity.y - impulse_y / obj1.mass,
                    obj1.velocity.z - impulse_z / obj1.mass
                )
                
            if not obj2.is_static:
                obj2.velocity = Vector3(
                    obj2.velocity.x + impulse_x / obj2.mass,
                    obj2.velocity.y + impulse_y / obj2.mass,
                    obj2.velocity.z + impulse_z / obj2.mass
                )
        else:
            # One object is static
            if obj1.is_static:
                j /= 1 / obj2.mass
                obj2.velocity = Vector3(
                    obj2.velocity.x + j * normal.x / obj2.mass,
                    obj2.velocity.y + j * normal.y / obj2.mass,
                    obj2.velocity.z + j * normal.z / obj2.mass
                )
            else:
                j /= 1 / obj1.mass
                obj1.velocity = Vector3(
                    obj1.velocity.x - j * normal.x / obj1.mass,
                    obj1.velocity.y - j * normal.y / obj1.mass,
                    obj1.velocity.z - j * normal.z / obj1.mass
                )
                
        # Positional correction to prevent sinking/jitter
        correction_percent = 0.2  # Penetration percentage to correct
        correction_threshold = 0.01  # Don't correct if penetration is small
        
        if penetration > correction_threshold:
            correction = penetration * correction_percent
            
            if not obj1.is_static and not obj2.is_static:
                # Calculate mass-dependent correction
                total_inverse_mass = (1 / obj1.mass) + (1 / obj2.mass)
                correction1 = correction * (1 / obj1.mass) / total_inverse_mass
                correction2 = correction * (1 / obj2.mass) / total_inverse_mass
                
                # Apply position correction
                obj1.position = Vector3(
                    obj1.position.x - normal.x * correction1,
                    obj1.position.y - normal.y * correction1,
                    obj1.position.z - normal.z * correction1
                )
                
                obj2.position = Vector3(
                    obj2.position.x + normal.x * correction2,
                    obj2.position.y + normal.y * correction2,
                    obj2.position.z + normal.z * correction2
                )
            else:
                # Only one object moves
                if not obj1.is_static:
                    obj1.position = Vector3(
                        obj1.position.x - normal.x * correction,
                        obj1.position.y - normal.y * correction,
                        obj1.position.z - normal.z * correction
                    )
                else:
                    obj2.position = Vector3(
                        obj2.position.x + normal.x * correction,
                        obj2.position.y + normal.y * correction,
                        obj2.position.z + normal.z * correction
                    ) 