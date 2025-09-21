<template>
  <div class="dashboard-container">
    <div class="camera-section">
      <div class="video-feed-container">
        <video
          ref="videoElement"
          autoplay
          muted
          class="video-feed"
          :src="videoStreamUrl ? videoStreamUrl : null"
        ></video>
      </div>
    </div>

    <div class="data-section">
      <div class="data-card history-card">
        <h2>Histórico de Ocorrências</h2>
        <ul class="occurrence-list">
          <li v-for="(item, index) in occurrences" :key="index">
            {{ item.employee }} sem {{ item.type }} - {{ item.time }}
          </li>
        </ul>
      </div>

      <div class="data-card chart-card">
        <h2>Gráfico de Infrações</h2>
        <BarChart :chartData="infractionsData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { formatChartData } from '@/services/dataService'
import BarChart from '@/components/BarChart.vue'

type Occurrence = {
  type: 'capacete' | 'oculos' | 'luvas' | 'cinto'
  employee: string
  time: string
}

export default {
  name: 'DashboardView',
  components: {
    BarChart,
  },
  data(): { videoStreamUrl: string; occurrences: Occurrence[] } {
    return {

      videoStreamUrl: '',

      occurrences: [
        { type: 'capacete', employee: 'Funcionário X', time: '14:30' },
        { type: 'oculos', employee: 'Funcionário Y', time: '14:35' },
        { type: 'luvas', employee: 'Funcionário Z', time: '14:40' },
        { type: 'cinto', employee: 'Funcionário A', time: '14:45' },
        { type: 'capacete', employee: 'Funcionário B', time: '14:50' },
        { type: 'oculos', employee: 'Funcionário C', time: '14:55' },
      ],
    }
  },
  computed: {
    infractionsData() {
      return formatChartData(this.occurrences)
    },
  },
  mounted() {
    this.startCamera()
  },
  methods: {
    async startCamera() {
      if (this.videoStreamUrl) {
        console.log('Tentando carregar stream externo.')
        return
      }

      // Se não houver URL, tenta acessar a câmera local.
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        const video = this.$refs.videoElement as HTMLVideoElement
        if (video) {
          video.srcObject = stream
          console.log('Webcam local ativada com sucesso.')
        }
      } catch (err) {
        console.error('Erro ao acessar a câmera: ', err)
        alert('Não foi possível acessar a câmera local. Verifique as permissões do navegador.')
      }
    },
  },
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  background-color: #121212;
  color: #f0f0f0;
  font-family: Arial, sans-serif;
  padding: 20px;
  gap: 20px;
  box-sizing: border-box;
}

.camera-section {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  border-radius: 12px;
  overflow: hidden;
}

.video-feed-container {
  width: 100%;
  height: 100%;
}

.video-feed {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.data-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.data-card {
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h2 {
  border-bottom: 2px solid #444;
  padding-bottom: 10px;
  margin-top: 0;
  margin-bottom: 15px;
  color: #fff;
}

.history-card {
  flex: 1;
  overflow-y: auto;
}

.occurrence-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.occurrence-list li {
  padding: 10px 0;
  border-bottom: 1px solid #333;
}

.occurrence-list li:last-child {
  border-bottom: none;
}

.chart-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chart-placeholder {
  flex: 1;
  background-color: #2a2a2a;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  color: #888;
}
</style>
