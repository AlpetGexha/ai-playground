# Social Media Multi-Platform Optimization System

This system provides AI-powered optimization of social media content for multiple platforms, specifically tailored for the hotel and restaurant industry.

## Features

- **Multi-Platform Support:** Optimize content for Facebook and Instagram with platform-specific best practices
- **Smart Content Adaptation:** Automatically adapts your content for optimal performance on each platform
- **Business-Specific Settings:** Customizes content based on your business details
- **Analytics & Insights:** Get engagement potential analysis for your content

## Available Commands

### Social Media Optimizer

This command guides you through creating optimized social media content for multiple platforms.

```bash
php artisan social:optimize
```


Options:
- `--monitor`: Enable monitoring of agent activity

### Business Settings Management

Update your business information used by the social media optimization agents:

```bash
php artisan business:update
```

View your current business settings:

```bash
php artisan business:show
```

## How It Works

The system uses a multi-agent approach:

1. **Controller Agent:** Coordinates between specialized platform agents
2. **Platform-Specific Agents:**
   - **Facebook Agent:** Optimizes content for Facebook's algorithm and audience
   - **Instagram Agent:** Optimizes content for Instagram's visual-first approach
3. **Analytics Agent:** Analyzes content for engagement potential

## Example Usage

1. Set up your business information:
   ```bash
   php artisan business:update
   ```

2. Run the social media optimizer:
   ```bash
   php artisan social:optimize:v2
   ```
   
   This version does direct agent calls, avoiding potential parameter issues with the tool-based approach.

3. Follow the interactive prompts to create your content.

4. Receive platform-optimized content ready to post on each platform.

## Configuration

Update your business details in the `.env` file:

```
BUSINESS_NAME="Hotel Driada"
BUSINESS_PHONE="+383 44 567 631"
BUSINESS_LOCATION="Pika e Zez, Gjakove"
BUSINESS_TYPE=hotel_restaurant
BUSINESS_DESCRIPTION="A beautiful hotel and restaurant offering excellent accommodation and dining experience."
BUSINESS_FACEBOOK=""
BUSINESS_INSTAGRAM=""
```

Or use the command to update these settings:

```bash
php artisan business:update
```
