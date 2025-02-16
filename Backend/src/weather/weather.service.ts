import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WeatherService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}

  async getWeatherData(location: string) {
    try {
      // 🔹 Fetch the latest API key from the database
      const settings = await this.prismaService.botSettings.findFirst();
      const apiKey =
        settings?.weatherApiKey ||
        this.configService.get<string>('WEATHER_API_KEY');

      // 🔹 If API key is missing, return an error
      if (!apiKey || apiKey.trim() === '') {
        throw new HttpException(
          '⚠️ API Key is missing or invalid.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const baseUrl = 'https://api.tomorrow.io/v4/weather/realtime';

      const response = await axios.get(`${baseUrl}`, {
        params: { location, apikey: apiKey },
      });

      const weather = response.data?.data?.values;
      if (!weather) {
        throw new HttpException(
          'Invalid weather data received.',
          HttpStatus.BAD_REQUEST,
        );
      }


      return {
        temperature: weather.temperature,
        
        humidity: weather.humidity,
      };
    } catch (error) {
      console.error(
        '❌ Weather API Error:',
        error.response?.data || error.message,
      );
      throw new HttpException(
        '❌ Failed to fetch weather data. Check API key.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
