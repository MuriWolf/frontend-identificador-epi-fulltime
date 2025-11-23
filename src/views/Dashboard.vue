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
      <div class="card history-card">
        <div class="card-header">
          <h2>Histórico de Ocorrências</h2>
        </div>
        <div class="card-body">
          <TransitionGroup name="list" tag="ul" class="list">
            <template v-for="occurence in occurrences" :key="occurence.id">
              <li v-if="occurence.has_helmet == false">
                Funcionário {{ occurence.track_id }} sem capacete - {{ occurence.timestamp }}
              </li>
            </template>
          </TransitionGroup>
        </div>
      </div>

      <div class="card chart-card">
        <div class="card-header">
          <h2>Gráfico de Infrações</h2>
        </div>
        <div class="card-body">
          <BarChart :chartData="infractionsData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { formatChartData, type Occurrence } from '@/services/dataService'
import BarChart from '@/components/BarChart.vue'

export default {
  name: 'DashboardView',
  components: {
    BarChart,
  },
  data(): {
    videoStreamUrl: string
    API_CALL_INTERVAL_SEC: number
    apiCallTimer: number | undefined
    occurrences: Occurrence[]
  } {
    return {
      API_CALL_INTERVAL_SEC: 10,
      videoStreamUrl: '',
      apiCallTimer: undefined,
      occurrences: [],
    }
  },
  computed: {
    infractionsData() {
      return formatChartData(this.occurrences)
    },
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
    async getInfractions() {
      const endpoint = 'http://127.0.0.1:8000/api/history/id'

      try {
        const response = await fetch(endpoint)
        const data = await response.json()

        if (data) {
          this.occurrences = data
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
  async mounted() {
    this.startCamera()

    this.getInfractions()
    this.apiCallTimer = setInterval(async () => {
      this.getInfractions()
    }, this.API_CALL_INTERVAL_SEC * 1000)
  },
  beforeUnmount() {
    clearInterval(this.apiCallTimer)
  },
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100%;
  color: #f0f0f0;
  font-family: Arial, sans-serif;
  gap: 20px;
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

.history-card {
  flex: 2;
  overflow-y: auto;
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

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
