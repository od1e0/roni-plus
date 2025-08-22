import type { CalculatorPart, CalculatorMaterial, CalculatorSize, CalculatorService } from '../types';

// В реальном проекте здесь будут API вызовы
// Пока используем localStorage для демонстрации

const CALCULATOR_STORAGE_KEY = 'calculator_data';

interface CalculatorData {
  parts: CalculatorPart[];
  services: CalculatorService[];
}

export class CalculatorServiceClass {
  private static getDefaultData(): CalculatorData {
    return {
      parts: [
        {
          id: '1',
          name: 'Стелла',
          description: 'Основная вертикальная часть памятника',
          isActive: true,
          order: 1,
          materials: [
            { id: '1', name: 'Габбро-диабаз', origin: 'Россия', isActive: true, order: 1 },
            { id: '2', name: 'Гранит', origin: 'Украина', isActive: true, order: 2 },
            { id: '3', name: 'Мрамор', origin: 'Италия', isActive: true, order: 3 }
          ],
          sizes: [
            { id: '1', name: 'Стандарт', dimensions: '100 x 50 x 5 см', price: 682.50, isActive: true, order: 1 },
            { id: '2', name: 'Средний', dimensions: '120 x 60 x 7 см', price: 1375.92, isActive: true, order: 2 },
            { id: '3', name: 'Большой', dimensions: '150 x 70 x 8 см', price: 2450.00, isActive: true, order: 3 }
          ]
        },
        {
          id: '2',
          name: 'Столбик',
          description: 'Боковая опорная часть',
          isActive: true,
          order: 2,
          materials: [
            { id: '1', name: 'Габбро-диабаз', origin: 'Россия', isActive: true, order: 1 },
            { id: '2', name: 'Гранит', origin: 'Украина', isActive: true, order: 2 }
          ],
          sizes: [
            { id: '4', name: 'Стандарт', dimensions: '30 x 30 x 80 см', price: 245.00, isActive: true, order: 1 },
            { id: '5', name: 'Высокий', dimensions: '35 x 35 x 100 см', price: 320.00, isActive: true, order: 2 }
          ]
        },
        {
          id: '3',
          name: 'Тумба',
          description: 'Основание памятника',
          isActive: true,
          order: 3,
          materials: [
            { id: '1', name: 'Габбро-диабаз', origin: 'Россия', isActive: true, order: 1 },
            { id: '2', name: 'Гранит', origin: 'Украина', isActive: true, order: 2 }
          ],
          sizes: [
            { id: '6', name: 'Стандарт', dimensions: '120 x 80 x 15 см', price: 580.00, isActive: true, order: 1 },
            { id: '7', name: 'Большая', dimensions: '150 x 100 x 20 см', price: 890.00, isActive: true, order: 2 }
          ]
        },
        {
          id: '4',
          name: 'Цветник',
          description: 'Декоративная ограда для цветов',
          isActive: true,
          order: 4,
          materials: [
            { id: '2', name: 'Гранит', origin: 'Украина', isActive: true, order: 2 },
            { id: '4', name: 'Лабрадорит', origin: 'Украина', isActive: true, order: 4 }
          ],
          sizes: [
            { id: '8', name: 'Стандарт', dimensions: '80 x 60 x 10 см', price: 320.00, isActive: true, order: 1 },
            { id: '9', name: 'Большой', dimensions: '100 x 80 x 12 см', price: 450.00, isActive: true, order: 2 }
          ]
        },
        {
          id: '5',
          name: 'Надгробная плита',
          description: 'Горизонтальная плита',
          isActive: true,
          order: 5,
          materials: [
            { id: '1', name: 'Габбро-диабаз', origin: 'Россия', isActive: true, order: 1 },
            { id: '3', name: 'Мрамор', origin: 'Италия', isActive: true, order: 3 }
          ],
          sizes: [
            { id: '10', name: 'Стандарт', dimensions: '200 x 100 x 8 см', price: 1200.00, isActive: true, order: 1 },
            { id: '11', name: 'Большая', dimensions: '250 x 120 x 10 см', price: 1800.00, isActive: true, order: 2 }
          ]
        }
      ],
      services: [
        { id: '1', name: 'Обычное художественное оформление', price: 145.00, isActive: true, order: 1 },
        { id: '2', name: 'Краска под золото (фреза или пескоструй)', price: 180.00, isActive: true, order: 2 },
        { id: '3', name: 'Фигурная резка', price: 275.00, isActive: true, order: 3 },
        { id: '4', name: 'Обычное художественное оформление двойной стелы', price: 240.00, isActive: true, order: 4 }
      ]
    };
  }

  static async getCalculatorData(): Promise<CalculatorData> {
    try {
      const stored = localStorage.getItem(CALCULATOR_STORAGE_KEY);
      if (stored) {
        const parsedData = JSON.parse(stored);
        // Validate that the parsed data has all required arrays
        if (parsedData && 
            Array.isArray(parsedData.parts) && 
            Array.isArray(parsedData.services)) {
          // Дополнительная проверка, что каждая часть имеет материалы и размеры
          const hasValidParts = parsedData.parts.every((part: any) => 
            part && Array.isArray(part.materials) && Array.isArray(part.sizes)
          );
          if (hasValidParts) {
            return parsedData;
          }
        }
        console.warn('Stored calculator data is incomplete, regenerating from defaults');
        // Clear corrupted data
        localStorage.removeItem(CALCULATOR_STORAGE_KEY);
      }
      // Возвращаем данные по умолчанию при первом запуске или если данные повреждены
      const defaultData = this.getDefaultData();
      localStorage.setItem(CALCULATOR_STORAGE_KEY, JSON.stringify(defaultData));
      return defaultData;
    } catch (error) {
      console.error('Error getting calculator data:', error);
      // Clear corrupted data and return defaults
      try {
        localStorage.removeItem(CALCULATOR_STORAGE_KEY);
      } catch (clearError) {
        console.error('Error clearing corrupted data:', clearError);
      }
      return this.getDefaultData();
    }
  }

  static async saveCalculatorData(data: CalculatorData): Promise<void> {
    try {
      localStorage.setItem(CALCULATOR_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving calculator data:', error);
      throw new Error('Не удалось сохранить данные калькулятора');
    }
  }

  // Методы для получения всех материалов и размеров (для обратной совместимости)
  static async getMaterials(): Promise<CalculatorMaterial[]> {
    const data = await this.getCalculatorData();
    if (!data.parts || !Array.isArray(data.parts)) {
      console.warn('Parts data is missing or invalid, returning empty array');
      return [];
    }
    // Собираем все уникальные материалы из всех частей
    const allMaterials = data.parts.flatMap(part => part.materials || []);
    const uniqueMaterials = allMaterials.filter((material, index, self) => 
      index === self.findIndex(m => m.id === material.id)
    );
    return uniqueMaterials.sort((a, b) => a.order - b.order);
  }

  static async getSizes(): Promise<CalculatorSize[]> {
    const data = await this.getCalculatorData();
    if (!data.parts || !Array.isArray(data.parts)) {
      console.warn('Parts data is missing or invalid, returning empty array');
      return [];
    }
    // Собираем все уникальные размеры из всех частей
    const allSizes = data.parts.flatMap(part => part.sizes || []);
    const uniqueSizes = allSizes.filter((size, index, self) => 
      index === self.findIndex(s => s.id === size.id)
    );
    return uniqueSizes.sort((a, b) => a.order - b.order);
  }

  // Новые методы для получения материалов и размеров конкретной части
  static async getMaterialsForPart(partId: string): Promise<CalculatorMaterial[]> {
    const data = await this.getCalculatorData();
    if (!data.parts || !Array.isArray(data.parts)) {
      return [];
    }
    const part = data.parts.find(p => p.id === partId);
    return part?.materials?.sort((a, b) => a.order - b.order) || [];
  }

  static async getSizesForPart(partId: string): Promise<CalculatorSize[]> {
    const data = await this.getCalculatorData();
    if (!data.parts || !Array.isArray(data.parts)) {
      return [];
    }
    const part = data.parts.find(p => p.id === partId);
    return part?.sizes?.sort((a, b) => a.order - b.order) || [];
  }

  static async getParts(): Promise<CalculatorPart[]> {
    const data = await this.getCalculatorData();
    if (!data.parts || !Array.isArray(data.parts)) {
      console.warn('Parts data is missing or invalid, returning default');
      return this.getDefaultData().parts;
    }
    return data.parts.sort((a, b) => a.order - b.order);
  }

  static async getServices(): Promise<CalculatorService[]> {
    const data = await this.getCalculatorData();
    if (!data.services || !Array.isArray(data.services)) {
      console.warn('Services data is missing or invalid, returning default');
      return this.getDefaultData().services;
    }
    return data.services.sort((a, b) => a.order - b.order);
  }

  static async updateMaterial(material: CalculatorMaterial, partId: string): Promise<void> {
    const data = await this.getCalculatorData();
    if (!data.parts || !Array.isArray(data.parts)) {
      throw new Error('Parts data is not available');
    }
    const part = data.parts.find(p => p.id === partId);
    if (!part || !Array.isArray(part.materials)) {
      throw new Error('Part or materials not found');
    }
    const index = part.materials.findIndex(m => m.id === material.id);
    if (index !== -1) {
      part.materials[index] = material;
      await this.saveCalculatorData(data);
    }
  }

  static async updateSize(size: CalculatorSize, partId: string): Promise<void> {
    const data = await this.getCalculatorData();
    if (!data.parts || !Array.isArray(data.parts)) {
      throw new Error('Parts data is not available');
    }
    const part = data.parts.find(p => p.id === partId);
    if (!part || !Array.isArray(part.sizes)) {
      throw new Error('Part or sizes not found');
    }
    const index = part.sizes.findIndex(s => s.id === size.id);
    if (index !== -1) {
      part.sizes[index] = size;
      await this.saveCalculatorData(data);
    }
  }

  static async updateService(service: CalculatorService): Promise<void> {
    const data = await this.getCalculatorData();
    if (!data.services || !Array.isArray(data.services)) {
      throw new Error('Services data is not available');
    }
    const index = data.services.findIndex(s => s.id === service.id);
    if (index !== -1) {
      data.services[index] = service;
      await this.saveCalculatorData(data);
    }
  }

  static async addMaterial(material: Omit<CalculatorMaterial, 'id'>, partId: string): Promise<CalculatorMaterial> {
    const data = await this.getCalculatorData();
    if (!data.parts || !Array.isArray(data.parts)) {
      throw new Error('Parts data is not available');
    }
    const part = data.parts.find(p => p.id === partId);
    if (!part || !Array.isArray(part.materials)) {
      throw new Error('Part or materials not found');
    }
    const newMaterial: CalculatorMaterial = {
      ...material,
      id: Date.now().toString()
    };
    part.materials.push(newMaterial);
    await this.saveCalculatorData(data);
    return newMaterial;
  }

  static async addSize(size: Omit<CalculatorSize, 'id'>, partId: string): Promise<CalculatorSize> {
    const data = await this.getCalculatorData();
    if (!data.parts || !Array.isArray(data.parts)) {
      throw new Error('Parts data is not available');
    }
    const part = data.parts.find(p => p.id === partId);
    if (!part || !Array.isArray(part.sizes)) {
      throw new Error('Part or sizes not found');
    }
    const newSize: CalculatorSize = {
      ...size,
      id: Date.now().toString()
    };
    part.sizes.push(newSize);
    await this.saveCalculatorData(data);
    return newSize;
  }

  static async addService(service: Omit<CalculatorService, 'id'>): Promise<CalculatorService> {
    const data = await this.getCalculatorData();
    if (!data.services || !Array.isArray(data.services)) {
      throw new Error('Services data is not available');
    }
    const newService: CalculatorService = {
      ...service,
      id: Date.now().toString()
    };
    data.services.push(newService);
    await this.saveCalculatorData(data);
    return newService;
  }

  static async deleteMaterial(id: string, partId: string): Promise<void> {
    const data = await this.getCalculatorData();
    if (!data.parts || !Array.isArray(data.parts)) {
      throw new Error('Parts data is not available');
    }
    const part = data.parts.find(p => p.id === partId);
    if (!part || !Array.isArray(part.materials)) {
      throw new Error('Part or materials not found');
    }
    part.materials = part.materials.filter(m => m.id !== id);
    await this.saveCalculatorData(data);
  }

  static async deleteSize(id: string, partId: string): Promise<void> {
    const data = await this.getCalculatorData();
    if (!data.parts || !Array.isArray(data.parts)) {
      throw new Error('Parts data is not available');
    }
    const part = data.parts.find(p => p.id === partId);
    if (!part || !Array.isArray(part.sizes)) {
      throw new Error('Part or sizes not found');
    }
    part.sizes = part.sizes.filter(s => s.id !== id);
    await this.saveCalculatorData(data);
  }

  static async deleteService(id: string): Promise<void> {
    const data = await this.getCalculatorData();
    if (!data.services || !Array.isArray(data.services)) {
      throw new Error('Services data is not available');
    }
    data.services = data.services.filter(s => s.id !== id);
    await this.saveCalculatorData(data);
  }

  // Parts methods
  static async addPart(part: Omit<CalculatorPart, 'id'>): Promise<CalculatorPart> {
    const data = await this.getCalculatorData();
    const newPart: CalculatorPart = {
      ...part,
      id: Date.now().toString()
    };
    data.parts.push(newPart);
    await this.saveCalculatorData(data);
    return newPart;
  }

  static async updatePart(part: CalculatorPart): Promise<void> {
    const data = await this.getCalculatorData();
    const index = data.parts.findIndex(p => p.id === part.id);
    if (index !== -1) {
      data.parts[index] = part;
      await this.saveCalculatorData(data);
    }
  }

  static async deletePart(id: string): Promise<void> {
    const data = await this.getCalculatorData();
    data.parts = data.parts.filter(p => p.id !== id);
    await this.saveCalculatorData(data);
  }

  // Utility method to reset calculator data to defaults
  static async resetToDefaults(): Promise<void> {
    try {
      localStorage.removeItem(CALCULATOR_STORAGE_KEY);
      console.log('Calculator data reset to defaults');
    } catch (error) {
      console.error('Error resetting calculator data:', error);
      throw new Error('Не удалось сбросить данные калькулятора');
    }
  }
}
