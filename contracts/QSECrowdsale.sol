// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title QSE Token Crowdsale
 * @dev Contract to manage the QSE token sale
 */
contract QSECrowdsale is Ownable, ReentrancyGuard {
    // Token being sold
    IERC20 public token;
    
    // Rate of tokens per ETH
    uint256 public rate;
    
    // Burn rate percentage (2%)
    uint256 public constant BURN_RATE = 2;
    
    // Sale start and end times
    uint256 public saleStartTime;
    uint256 public saleEndTime;
    
    // Minimum and maximum purchase amounts in wei
    uint256 public minPurchase;
    uint256 public maxPurchase;
    
    // Total wei raised
    uint256 public weiRaised;
    
    // Wallet where collected funds will be forwarded to
    address payable public wallet;
    
    // Event for token purchases
    event TokensPurchased(address indexed purchaser, uint256 value, uint256 amount);
    
    // Event for tokens burned
    event TokensBurned(uint256 amount);

    /**
     * @param initialRate Number of tokens per ETH
     * @param fundingWallet Address where collected funds will be sent
     * @param tokenAddress Address of the token being sold
     * @param _saleStartTime Start time of the sale
     * @param _saleEndTime End time of the sale
     * @param _minPurchase Minimum purchase amount in wei
     * @param _maxPurchase Maximum purchase amount in wei
     */
    constructor(
        uint256 initialRate,
        address payable fundingWallet,
        address tokenAddress,
        uint256 _saleStartTime,
        uint256 _saleEndTime,
        uint256 _minPurchase,
        uint256 _maxPurchase
    ) Ownable(msg.sender) {
        require(initialRate > 0, "Rate must be greater than 0");
        require(fundingWallet != address(0), "Wallet cannot be zero address");
        require(tokenAddress != address(0), "Token cannot be zero address");
        require(_saleStartTime >= block.timestamp, "Sale start time must be in the future");
        require(_saleEndTime > _saleStartTime, "Sale end time must be after start time");
        require(_minPurchase > 0, "Min purchase amount must be greater than 0");
        require(_maxPurchase >= _minPurchase, "Max purchase must be >= min purchase");
        
        rate = initialRate;
        wallet = fundingWallet;
        token = IERC20(tokenAddress);
        saleStartTime = _saleStartTime;
        saleEndTime = _saleEndTime;
        minPurchase = _minPurchase;
        maxPurchase = _maxPurchase;
    }
    
    /**
     * @dev Fallback function to buy tokens
     */
    receive() external payable {
        buyTokens();
    }
    
    /**
     * @dev Buy tokens
     */
    function buyTokens() public payable nonReentrant {
        uint256 weiAmount = msg.value;
        _preValidatePurchase(weiAmount);
        
        // Calculate token amount
        uint256 totalTokens = _getTokenAmount(weiAmount);
        
        // Calculate burn amount
        uint256 burnAmount = (totalTokens * BURN_RATE) / 100;
        uint256 netTokens = totalTokens - burnAmount;
        
        // Update state
        weiRaised += weiAmount;
        
        // Transfer tokens
        require(token.transfer(msg.sender, netTokens), "Token transfer failed");
        
        // Burn tokens (send to dead address)
        address burnAddress = address(0x000000000000000000000000000000000000dEaD);
        require(token.transfer(burnAddress, burnAmount), "Token burn failed");
        
        // Send ETH to wallet
        wallet.transfer(weiAmount);
        
        // Emit events
        emit TokensPurchased(msg.sender, weiAmount, netTokens);
        emit TokensBurned(burnAmount);
    }
    
    /**
     * @dev Validates purchase conditions
     * @param weiAmount Amount of wei sent
     */
    function _preValidatePurchase(uint256 weiAmount) internal view {
        require(block.timestamp >= saleStartTime, "Sale not started");
        require(block.timestamp <= saleEndTime, "Sale ended");
        require(weiAmount >= minPurchase, "Purchase below minimum");
        require(weiAmount <= maxPurchase, "Purchase above maximum");
    }
    
    /**
     * @dev Calculate token amount based on ETH amount
     * @param weiAmount Amount of wei sent
     * @return Number of tokens
     */
    function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
        return weiAmount * rate;
    }
    
    /**
     * @dev Update token rate
     * @param newRate New rate for token purchases
     */
    function setRate(uint256 newRate) external onlyOwner {
        require(newRate > 0, "Rate must be greater than 0");
        rate = newRate;
    }
    
    /**
     * @dev Update sale period
     * @param newStartTime New start time
     * @param newEndTime New end time
     */
    function setSalePeriod(uint256 newStartTime, uint256 newEndTime) external onlyOwner {
        require(newStartTime >= block.timestamp, "Start time must be in the future");
        require(newEndTime > newStartTime, "End time must be after start time");
        saleStartTime = newStartTime;
        saleEndTime = newEndTime;
    }
    
    /**
     * @dev Update purchase limits
     * @param newMinPurchase New minimum purchase amount
     * @param newMaxPurchase New maximum purchase amount
     */
    function setPurchaseLimits(uint256 newMinPurchase, uint256 newMaxPurchase) external onlyOwner {
        require(newMinPurchase > 0, "Min purchase must be greater than 0");
        require(newMaxPurchase >= newMinPurchase, "Max purchase must be >= min purchase");
        minPurchase = newMinPurchase;
        maxPurchase = newMaxPurchase;
    }
    
    /**
     * @dev Ends sale and transfers remaining tokens back to owner
     */
    function endSale() external onlyOwner {
        require(block.timestamp > saleEndTime || block.timestamp > saleStartTime, "Sale not started");
        
        // Transfer unsold tokens back to owner
        uint256 unsoldTokens = token.balanceOf(address(this));
        if (unsoldTokens > 0) {
            require(token.transfer(owner(), unsoldTokens), "Token transfer failed");
        }
    }
}