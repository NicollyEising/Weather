const modal = document.getElementById('modal');
const buscarBtn = document.getElementById('buscarBtn');
const resultado = document.getElementById('resultado');
const resultado2 = document.getElementById('resultado2');
const resultado3 = document.getElementById('resultado3');
const title = document.getElementsByClassName('modal-card-title')[0];

function abrirModal() {
  modal.classList.add('is-active');
}

function fecharModal() {
  modal.classList.remove('is-active');
}

function getDayOfWeek(dateString) {
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const date = new Date(dateString + "T00:00:00");
    return days[date.getDay()];
  }

async function buscarClima() {
  const cidade = document.getElementById('cidade').value.trim();

  if (!cidade) {
    alert('Por favor, digite uma cidade.');
    return;
  }

  try {
    const resposta = await fetch(`/clima?cidade=${encodeURIComponent(cidade)}&dias=3`);
    const dados = await resposta.json();

    if (dados.erro || !dados.location) {
      resultado.innerHTML = `<p>Erro ao obter dados do clima. Verifique a cidade digitada.</p>`;
      resultado2.innerHTML = '';
      resultado3.innerHTML = '';
    } else {
      const forecast = dados.forecast.forecastday;

      resultado.innerHTML =
      `<div style="text-align: center; color: white;">
         <p style="text-align: center; color: white;"><strong style="text-align: center; color: white;">${getDayOfWeek(forecast[0].date)}</strong></p>
         <p>${forecast[0].day.avgtemp_c}°C</p>
         <img src="${forecast[0].day.condition.icon}" alt="Ícone do clima">
       </div>`;
    
    resultado2.innerHTML =
      `<div style="text-align: center; color: white;">
         <p style="text-align: center; color: white;"><strong style="text-align: center; color: white;">${getDayOfWeek(forecast[1].date)}</strong></p>
         <p>${forecast[1].day.avgtemp_c}°C</p>
         <img src="${forecast[1].day.condition.icon}" alt="Ícone do clima">
       </div>`;
    
    resultado3.innerHTML =
      `<div style="text-align: center; color: white;">
         <p style="text-align: center; color: white;"><strong style="text-align: center; color: white;">${getDayOfWeek(forecast[2].date)}</strong></p>
         <p>${forecast[2].day.avgtemp_c}°C</p>
         <img src="${forecast[2].day.condition.icon}" alt="Ícone do clima">
       </div>`;

    title.innerHTML = `Previsão para ${dados.location.name}`;
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    }
  } catch (e) {
    resultado.innerHTML = `<p>Erro na requisição. Tente novamente.</p>`;
    resultado2.innerHTML = '';
    resultado3.innerHTML = '';
    console.error(e);
  }

  abrirModal();
}

buscarBtn.addEventListener('click', buscarClima);
modal.querySelector('.modal-background').addEventListener('click', fecharModal);
modal.querySelector('.delete').addEventListener('click', fecharModal);
