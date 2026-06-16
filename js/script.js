const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    menuBtn.setAttribute("aria-expanded", aberto);
});

menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("aberto");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

function animarContador(el) {
    const alvo = Number(el.dataset.alvo);
    const prefixo = el.dataset.prefixo || "";
    const sufixo = el.dataset.sufixo || "";
    const duracao = 1200;
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
                obs.unobserve(entrada.target);
            }
        });
    },
    { threshold: 0.6 }
);

document.querySelectorAll(".contador").forEach((el) => {
    observadorContadores.observe(el);
});

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

    const prejuizo = km * custoKm;
    const ganho = km * custoKm * 1.5;
    const diferenca = prejuizo + ganho;

    kmValor.textContent = km;
    custoValor.textContent = custoKm.toFixed(2).replace(".", ",");
    resPrejuizo.textContent = formatarReal(prejuizo);
    resGanho.textContent = "+ " + formatarReal(ganho);
    resTotal.textContent = formatarReal(diferenca);
}

kmInput.addEventListener("input", calcularSimulador);
custoInput.addEventListener("input", calcularSimulador);
calcularSimulador();

const formCadastro = document.getElementById("form-cadastro");
const formMsg = document.getElementById("form-msg");

formCadastro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const perfil = document.getElementById("perfil").value;

    if (nome === "" || email === "" || !email.includes("@")) {
        formMsg.textContent = "Preencha seu nome e um e-mail válido.";
        formMsg.className = "form-msg erro";
        return;
    }

    console.log("Novo cadastro:", { nome, email, perfil });

    formMsg.textContent =
        "Pronto, " + nome.split(" ")[0] + "! Você está na lista de espera. 🚛";
    formMsg.className = "form-msg ok";
    formCadastro.reset();
});

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
