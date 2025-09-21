
export interface Occurrence {
  type: 'capacete' | 'oculos' | 'luvas' | 'cinto';
  employee: string;
  time: string;
}


export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    backgroundColor: string[];
    data: number[];
  }[];
}


export function formatChartData(occurrences: Occurrence[]): ChartData {
  const counts = {
    capacete: 0,
    oculos: 0,
    luvas: 0,
    cinto: 0,
  };

  occurrences.forEach(occurrence => {
    if (counts.hasOwnProperty(occurrence.type)) {
      counts[occurrence.type]++;
    }
  });
  return {
    labels: ['Capacete', 'Óculos', 'Luvas', 'Cinto',],
    datasets: [
      {
        label: 'Infrações por Tipo de EPI',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        data: [counts.capacete, counts.oculos, counts.luvas, counts.cinto],
      },
    ],
  };
}
