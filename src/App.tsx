import React, { useState } from 'react';
import { Scale } from 'lucide-react';

interface BMIClassification {
  range: string;
  classification: string;
}

const bmiTable: BMIClassification[] = [
  { range: 'Menor que 18.5', classification: 'Abaixo do peso' },
  { range: '18.5 - 24.9', classification: 'Peso normal' },
  { range: '25.0 - 29.9', classification: 'Sobrepeso' },
  { range: '30.0 - 34.9', classification: 'Obesidade grau 1' },
  { range: '35.0 - 39.9', classification: 'Obesidade grau 2' },
  { range: 'Maior que 40.0', classification: 'Obesidade grau 3' },
];

function App() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
    setBmi(parseFloat(calculatedBMI.toFixed(1)));
  };

  const getBMIClassification = (bmi: number): string => {
    if (bmi < 18.5) return 'Abaixo do peso';
    if (bmi < 25) return 'Peso normal';
    if (bmi < 30) return 'Sobrepeso';
    if (bmi < 35) return 'Obesidade grau 1';
    if (bmi < 40) return 'Obesidade grau 2';
    return 'Obesidade grau 3';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-8 py-6">
          <div className="flex items-center justify-center mb-6">
            <Scale className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Calculadora de IMC
          </h2>
          
          <form onSubmit={calculateBMI} className="space-y-6">
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                Altura (cm)
              </label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="170"
                required
              />
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                Peso (kg)
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="70"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calcular IMC
            </button>
          </form>

          {bmi !== null && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Resultado:</h3>
              <p className="mt-2 text-sm text-gray-600">
                Seu IMC é: <span className="font-bold">{bmi}</span>
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Classificação:{' '}
                <span className="font-bold">{getBMIClassification(bmi)}</span>
              </p>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tabela de IMC</h3>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-4 text-sm font-semibold text-gray-900">IMC</th>
                    <th className="py-2 px-4 text-sm font-semibold text-gray-900">Classificação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {bmiTable.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 text-sm text-gray-500">{item.range}</td>
                      <td className="py-2 px-4 text-sm text-gray-500">{item.classification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;