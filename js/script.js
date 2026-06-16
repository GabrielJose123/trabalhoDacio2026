// =========================================================
// CARGOO — script.js
// Funcionalidades:
// 1. Menu mobile (toggle)
// 2. Contadores animados ao rolar (IntersectionObserver)
// 3. Simulador de frete de retorno (inputs range)
// 4. Formulário de cadastro com validação simples
// 5. Animação de revelar seções ao rolar
// =========================================================

// ---------- 1. Menu mobile ----------
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    menuBtn.setAttribute("aria-expanded", aberto);
});

// Fecha o menu ao clicar em um link (no mobile)
menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("aberto");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

// ---------- 2. Contadores animados ----------
function animarContador(el) {
    const alvo = Number(el.dataset.alvo);
    const prefixo = el.dataset.prefixo || "";
    const sufixo = el.dataset.sufixo || "";
    const duracao = 1200; // ms
    const inicio = performance.now();

    function passo(agora) {
        const progresso = Math.min((agora - inicio) / duracao, 1);
        const valor = Math.round(alvo * progresso);
        el.textContent = prefixo + valor + sufixo;
        if (progresso < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
}

const observadorContadores = new IntersectionObserver(
    (entradas, obs) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                animarContador(entrada.target);
                obs.unobserve(entrada.target); // anima só uma vez
            }
        });
    },
    { threshold: 0.6 }
);

document.querySelectorAll(".contador").forEach((el) => {
    observadorContadores.observe(el);
});

// ---------- 3. Simulador de frete de retorno ----------
const kmInput = document.getElementById("km");
const custoInput = document.getElementById("custo-km");
const kmValor = document.getElementById("km-valor");
const custoValor = document.getElementById("custo-valor");
const resPrejuizo = document.getElementById("res-prejuizo");
const resGanho = document.getElementById("res-ganho");
const resTotal = document.getElementById("res-total");

const formatarReal = (valor) =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
    });

function calcularSimulador() {
    const km = Number(kmInput.value);
    const custoKm = Number(custoInput.value);

    // Prejuízo: rodar vazio custa km * custo por km
    const prejuizo = km * custoKm;

    // Estimativa simples de frete de retorno:
    // fretes de retorno costumam pagar abaixo do frete cheio,
    // aqui estimamos ~1,5x o custo por km como receita.
    const ganho = km * custoKm * 1.5;

    // Diferença total: deixa de perder + passa a ganhar
    const diferenca = prejuizo + ganho;

    kmValor.textContent = km;
    custoValor.textContent = custoKm.toFixed(2).replace(".", ",");
    resPrejuizo.textContent = formatarReal(prejuizo);
    resGanho.textContent = "+ " + formatarReal(ganho);
    resTotal.textContent = formatarReal(diferenca);
}

kmInput.addEventListener("input", calcularSimulador);
custoInput.addEventListener("input", calcularSimulador);
calcularSimulador(); // calcula com os valores iniciais

// ---------- 4. Formulário de cadastro ----------
const formCadastro = document.getElementById("form-cadastro");
const formMsg = document.getElementById("form-msg");

formCadastro.addEventListener("submit", (evento) => {
    evento.preventDefault(); // não recarrega a página

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const perfil = document.getElementById("perfil").value;

    // Validação simples
    if (nome === "" || email === "" || !email.includes("@")) {
        formMsg.textContent = "Preencha seu nome e um e-mail válido.";
        formMsg.className = "form-msg erro";
        return;
    }

    // Aqui, em um produto real, os dados seriam enviados a um backend.
    console.log("Novo cadastro:", { nome, email, perfil });

    formMsg.textContent =
        "Pronto, " + nome.split(" ")[0] + "! Você está na lista de espera. 🚛";
    formMsg.className = "form-msg ok";
    formCadastro.reset();
});

// ---------- 5. Revelar seções ao rolar ----------
const blocosRevelar = document.querySelectorAll(
    ".numero, .lado, .simulador-card, .form-cadastro"
);

blocosRevelar.forEach((el) => el.classList.add("revelar"));

const observadorRevelar = new IntersectionObserver(
    (entradas, obs) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                obs.unobserve(entrada.target);
            }
        });
    },
    { threshold: 0.2 }
);

blocosRevelar.forEach((el) => observadorRevelar.observe(el));
