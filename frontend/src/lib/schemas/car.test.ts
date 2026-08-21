import { describe, expect, it } from 'vitest';
import { createCarSchema, searchCarSchema } from '@/lib/schemas/car';

const base = {
  brand: 'Toyota',
  model: 'Camry',
  year: '2019',
  color: 'Чёрный',
  price: '1850000',
  mileage: '87400',
  vin: 'JTDBE32K600123456',
};

const parse = (patch: Partial<typeof base>) =>
  createCarSchema.safeParse({ ...base, ...patch });

const message = (patch: Partial<typeof base>) => {
  const r = parse(patch);
  return r.success ? undefined : r.error.issues[0].message;
};

it('принимает корректные данные', () => {
  expect(parse({}).success).toBe(true);
});

describe('brand', () => {
  it('отклоняет пустую строку', () => {
    const r = parse({ brand: '' });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0].message).toBe('Укажите бренд');
  });

  it('отклоняет строку из пробелов', () => {
    const r = parse({ brand: '     ' });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0].message).toBe('Укажите бренд');
  });

  it('обрезает окружающие пробелы', () => {
    const r = parse({ brand: '  Toyota  ' });
    expect(r.success && r.data.brand).toBe('Toyota');
  });

  it('принимает ровно 100 символов', () => {
    const r = parse({ brand: 'a'.repeat(100) });
    expect(r.success).toBe(true);
  });

  it('отклоняет 101 символ', () => {
    const r = parse({ brand: 'a'.repeat(101) });
    expect(r.error?.issues[0].message).toBe('Не более 100 символов');
  });
});

describe('model', () => {
  it('отклоняет пустую строку', () => {
    expect(message({ model: '' })).toBe('Укажите модель');
  });

  it('принимает ровно 100 символов', () => {
    expect(parse({ model: 'a'.repeat(100) }).success).toBe(true);
  });

  it('отклоняет 101 символ', () => {
    expect(message({ model: 'a'.repeat(101) })).toBe('Не более 100 символов');
  });
});

describe('color', () => {
  it('отклоняет пустую строку', () => {
    expect(message({ color: '' })).toBe('Укажите цвет');
  });

  it('принимает ровно 50 символов', () => {
    expect(parse({ color: 'a'.repeat(50) }).success).toBe(true);
  });

  it('отклоняет 51 символ', () => {
    expect(message({ color: 'a'.repeat(51) })).toBe('Не более 50 символов');
  });
});

describe('year', () => {
  it('приводит строку к числу', () => {
    const r = parse({});
    expect(r.success && r.data.year).toBe(2019);
  });

  it('отклоняет пустую строку', () => {
    expect(message({ year: '' })).toBe('Укажите год');
  });

  it('отклоняет нечисловое значение', () => {
    expect(message({ year: 'абв' })).toBe('Год должен быть числом');
  });

  it('отклоняет дробное значение', () => {
    expect(message({ year: '2019.5' })).toBe('Год должен быть целым');
  });

  it('принимает нижнюю границу 1900', () => {
    expect(parse({ year: '1900' }).success).toBe(true);
  });

  it('отклоняет 1899', () => {
    expect(message({ year: '1899' })).toBe('Не раньше 1900');
  });

  it('принимает следующий год', () => {
    const next = new Date().getFullYear() + 1;
    expect(parse({ year: String(next) }).success).toBe(true);
  });

  it('отклоняет год через два от текущего', () => {
    const tooLate = new Date().getFullYear() + 2;
    expect(parse({ year: String(tooLate) }).success).toBe(false);
  });
});

describe('price', () => {
  it('приводит строку к числу', () => {
    const r = parse({});
    expect(r.success && r.data.price).toBe(1850000);
  });

  it('отклоняет пустую строку', () => {
    expect(message({ price: '' })).toBe('Укажите цену');
  });

  it('отклоняет ноль', () => {
    expect(message({ price: '0' })).toBe('Цена должна быть больше нуля');
  });

  it('отклоняет отрицательное значение', () => {
    expect(message({ price: '-1' })).toBe('Цена должна быть больше нуля');
  });

  it('отклоняет дробное значение', () => {
    expect(message({ price: '1850000.5' })).toBe('Цена должна быть целой');
  });
});

describe('mileage', () => {
  it('принимает ноль', () => {
    const r = parse({ mileage: '0' });
    expect(r.success && r.data.mileage).toBe(0);
  });

  it('отклоняет пустую строку, а не превращает её в ноль', () => {
    expect(message({ mileage: '' })).toBe('Укажите пробег');
  });

  it('отклоняет отрицательное значение', () => {
    expect(message({ mileage: '-1' })).toBe(
      'Пробег не может быть отрицательным',
    );
  });

  it('отклоняет дробное значение', () => {
    expect(message({ mileage: '87400.5' })).toBe('Пробег должен быть целым');
  });
});

describe('vin', () => {
  it('приводит к верхнему регистру', () => {
    const r = parse({ vin: 'jtdbe32k600123456' });
    expect(r.success && r.data.vin).toBe('JTDBE32K600123456');
  });

  it('отклоняет 16 символов', () => {
    expect(message({ vin: 'JTDBE32K60012345' })).toBe(
      'VIN состоит из 17 символов',
    );
  });

  it('отклоняет 18 символов', () => {
    expect(message({ vin: 'JTDBE32K6001234567' })).toBe(
      'VIN состоит из 17 символов',
    );
  });

  it.each(['I', 'O', 'Q'])('отклоняет запрещённую букву %s', (letter) => {
    expect(message({ vin: `${letter}TDBE32K600123456` })).toBe(
      'VIN не может содержать I, O и Q',
    );
  });

  it.each(['i', 'o', 'q'])(
    'отклоняет запрещённую букву %s в нижнем регистре',
    (letter) => {
      expect(message({ vin: `${letter}TDBE32K600123456` })).toBe(
        'VIN не может содержать I, O и Q',
      );
    },
  );

  it('отклоняет дефис', () => {
    expect(message({ vin: 'JTDBE32K60012345-' })).toBe(
      'VIN не может содержать I, O и Q',
    );
  });
});

describe('searchCarSchema', () => {
  const search = (query: string) => searchCarSchema.safeParse({ query });

  const searchMessage = (query: string) => {
    const r = search(query);
    return r.success ? undefined : r.error.issues[0].message;
  };

  it('принимает слово из трёх букв', () => {
    const r = search('bmw');
    expect(r.success && r.data.query).toBe('bmw');
  });

  it('обрезает окружающие пробелы', () => {
    const r = search('  bmw  ');
    expect(r.success && r.data.query).toBe('bmw');
  });

  it('отклоняет пустую строку', () => {
    expect(searchMessage('')).toBe('Введите запрос');
  });

  it('отклоняет строку из одних пробелов', () => {
    expect(searchMessage('     ')).toBe('Введите запрос');
  });

  it('отклоняет слово короче трёх букв', () => {
    expect(searchMessage('bm')).toBe(
      'Слово для поиска должно быть не короче 3 символов',
    );
  });

  it('отклоняет набор коротких слов', () => {
    expect(searchMessage('a b c')).toBe(
      'Слово для поиска должно быть не короче 3 символов',
    );
  });

  it('принимает запрос, где годен хотя бы один токен', () => {
    expect(search('bmw x5').success).toBe(true);
  });

  it('принимает ровно 100 символов', () => {
    expect(search('a'.repeat(100)).success).toBe(true);
  });

  it('отклоняет 101 символ', () => {
    expect(searchMessage('a'.repeat(101))).toBe('Не более 100 символов');
  });

  it('сообщает о длине раньше, чем о токенах', () => {
    expect(searchMessage('ab '.repeat(50))).toBe('Не более 100 символов');
  });
});
