export interface Occurrence {
  id: number
  track_id: number
  timestamp: string
  has_helmet: boolean
  bbox: string
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    backgroundColor: string[]
    data: number[]
  }[]
}

export function formatChartData(occurrences: Occurrence[]): ChartData {
  const infractionsCount = {
    helmets: 0,
    glasses: 0,
    gloves: 0,
    belts: 0,
  }

  occurrences.forEach((occurrence) => {
    // se não possui capacete, adicionar na contagem de infrações
    if (infractionsCount.hasOwnProperty('helmets') && !occurrence?.has_helmet) {
      infractionsCount.helmets++
    }
  })

  return {
    // Adicionar mais tipos de infrações com o tempo
    labels: ['Capacete', 'Óculos', 'Luva', 'Cinto'],
    datasets: [
      {
        label: 'Infrações por Tipo de EPI',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        data: [
          infractionsCount.helmets,
          infractionsCount.glasses,
          infractionsCount.gloves,
          infractionsCount.belts,
        ],
      },
    ],
  }
}
