import { TeamsActivityHandler, TurnContext } from 'botbuilder';
import axios from 'axios';
import { stringify } from 'querystring';
import config from '../config'

class ChatterBot extends TeamsActivityHandler {
  constructor() {
    super();
    this.onMessage(async (context, next) => {
      await this.handleMessage(context);
      await next();
    });
  }

  async handleMessage(context: TurnContext) {
    const userMessage = context.activity.text;
    const apiResponse = await this.callMyApi(userMessage);
    await context.sendActivity(apiResponse);
  }

  async callMyApi(message: string): Promise<string> {
    try {
      const response = await axios.post(config.ChatterBotUrl, { text: message, tenant: config.ChatterBotTenant });
      return response.data.text;
    } catch (error) {
      console.error('Error calling API:', error);
      return 'Sorry, there was an error processing your request.';
    }
  }
}

export default ChatterBot;
