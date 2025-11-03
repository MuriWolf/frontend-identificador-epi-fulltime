<template>
  <main>
    <article class="card">
      <section class="card-header">
        <h2>Ideia e motivação do projeto</h2>
      </section>
      <section class="card-body">
        <p>
          Nossa ideia de projeto surgiu da reflexão de tópicos relecionados ao que a empresa
          FullTime trabalha, e ela é o seguinte: Um sistema que reconhece através de visão
          computacional se os trabalhadores de determinada empresa/indústria estão devidamente
          equipados com o kit EPI (Equipamento de Proteção Individual) e que gera relatórios em
          tempo real com as informações relevantes para tratar o problema.
        </p>
        <p>
          Ter acesso a esses dados é de grande utilidade para um empresa/indústria que deseja
          melhorar sua segurança e evitar acidentes, pois com nossa aplicação ela sabe de onde o
          problema irá vir e quando ele vai acontecer.
        </p>
      </section>
    </article>
    <div class="wrapper-cards">
      <article class="card">
        <section class="card-header">
          <h2>Tecnologia</h2>
        </section>
        <section class="card-body">
          <p>A aplicação está separada em algumas partes:</p>
          <ul class="list">
            <li>
              <strong>Algoritmo IA: </strong>Nossa IA é treinada com imagens reais, para tornar o
              modelo efetivo no reconhecimento. ADICIONAR O NOME DA TECNOLOGIA
            </li>
            <li>
              <strong>API:</strong> Responsável por capturar os dados obtidos pelo algoritmo,
              formatá-los e enviar para o Frontend. ADICIONAR NOME DA TECNOLOGIA
            </li>
            <li>
              <strong>Frontend:</strong> É onde os dados são apresentados e onde o usuário final
              (ex: gerente de segurança) tem contato direto com a aplicação. Foi usado o Vue
              (framework JS).
            </li>
          </ul>
        </section>
      </article>
      <article class="card">
        <section class="card-header">
          <h2>Os criadores</h2>
        </section>
        <section class="card-body">
          <ul class="list">
            <li>David Eduardo Lino</li>
            <li title="e Daniel Molo">Lucas Marques</li>
            <li>Murillo Pinheiro de Oliveira</li>
            <li>Matheus Floresti</li>
            <li>Lucas Spila Sereno</li>
            <li>Gustavo Marques Martins</li>
          </ul>
        </section>
      </article>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

main > * {
  flex: 1;
}

.wrapper-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.wrapper-cards > * {
  flex: 1;
}
</style>
