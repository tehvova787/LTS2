"""
API endpoints for TON blockchain integration with metaverse
"""

from fastapi import APIRouter, Depends, HTTPException, Body
from typing import Dict, List, Any, Optional
import logging

from .ton_integration import TONMetaverseIntegration, create_ton_integration

# Setup logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter(
    prefix="/api/blockchain",
    tags=["blockchain"],
    responses={404: {"description": "Not found"}},
)

# Global TON integration instance
ton_integration: Optional[TONMetaverseIntegration] = None

async def get_ton_integration() -> TONMetaverseIntegration:
    """
    Get or initialize TON integration instance
    """
    global ton_integration
    
    if ton_integration is None:
        # Configuration would normally come from environment variables or config file
        config = {
            "connection_config": {
                "network": "testnet",  # or "mainnet"
                "endpoints": ["https://testnet.toncenter.com/api/v2/jsonRPC"]
            },
            "owner_address": "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c",  # Example address
            "contract_address": None  # Will deploy new contract if None
        }
        
        ton_integration = create_ton_integration(config)
        await ton_integration.initialize()
    
    return ton_integration


@router.post("/assets", response_model=Dict[str, Any])
async def create_asset(
    asset_data: Dict[str, Any] = Body(...),
    ton: TONMetaverseIntegration = Depends(get_ton_integration)
):
    """
    Create a new metaverse asset on TON blockchain
    """
    try:
        result = await ton.create_metaverse_asset(asset_data)
        return result
    except Exception as e:
        logger.error(f"Failed to create asset: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/assets/transfer", response_model=Dict[str, Any])
async def transfer_asset(
    transfer_data: Dict[str, Any] = Body(...),
    ton: TONMetaverseIntegration = Depends(get_ton_integration)
):
    """
    Transfer asset ownership to a new owner
    """
    try:
        asset_id = transfer_data.get("asset_id")
        from_address = transfer_data.get("from_address")
        to_address = transfer_data.get("to_address")
        
        if not all([asset_id, from_address, to_address]):
            raise HTTPException(status_code=400, detail="Missing required parameters")
        
        result = await ton.transfer_asset(asset_id, from_address, to_address)
        return result
    except Exception as e:
        logger.error(f"Failed to transfer asset: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/assets/{asset_id}", response_model=Dict[str, Any])
async def get_asset(
    asset_id: int,
    ton: TONMetaverseIntegration = Depends(get_ton_integration)
):
    """
    Get asset information from TON blockchain
    """
    try:
        result = await ton.get_asset_info(asset_id)
        if result is None:
            raise HTTPException(status_code=404, detail=f"Asset {asset_id} not found")
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to get asset info: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/verify-ownership/{asset_id}/{address}", response_model=Dict[str, bool])
async def verify_asset_ownership(
    asset_id: int,
    address: str,
    ton: TONMetaverseIntegration = Depends(get_ton_integration)
):
    """
    Verify if an address owns a specific asset
    """
    try:
        result = await ton.verify_ownership(asset_id, address)
        return {"owned": result}
    except Exception as e:
        logger.error(f"Failed to verify ownership: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 