// Base de Conhecimento (Data Source)
const operatorsData = [
    { title: "Igualdade Estrita", symbol: "===", desc: "Compara valor e tipo. A escolha padrão para evitar bugs silenciosos.", code: "1 === '1' // false" },
    { title: "Spread Operator", symbol: "...", desc: "Expande elementos iteráveis. Indispensável para imutabilidade moderna.", code: "const n = [...apiData, 4];" },
    { title: "Nullish Coalescing", symbol: "??", desc: "Retorna o lado direito apenas se o esquerdo for null ou undefined.", code: "const user = input ?? 'Anônimo';" },
    { title: "Optional Chaining", symbol: "?.", desc: "Acessa propriedades aninhadas com segurança, sem quebrar o código.", code: "const street = user?.addr?.street;" },
    { title: "Ternário", symbol: "? :", desc: "A forma elegante de escrever condicionais simples em uma linha.", code: "const msg = ativo ? 'Sim' : 'Não';" },
    { title: "Atribuição Lógica OR", symbol: "||=", desc: "Atribui valor à variável apenas se o valor atual for falsy.", code: "let user = '';\nuser ||= 'Convidado';" }
];

// Classe principal da Interface
class OperatorBoard {
    constructor(data, containerId) {
        this.data = data;
        this.container = document.getElementById(containerId);
    }

    init() {
        this.render();
        this.addTiltEffect();
    }

    render() {
        // Mapeia e injeta o HTML
        this.container.innerHTML = this.data.map(op => `
            <article class="card">
                <div class="card-header">
                    <h2 class="card-title">${op.title}</h2>
                    <span class="operator-symbol">${op.symbol}</span>
                </div>
                <p class="card-desc" style="color: var(--text-muted); margin: 1rem 0;">${op.desc}</p>
                <div class="code-block">
                    <code>${op.code.replace(/\n/g, '<br>')}</code>
                </div>
            </article>
        `).join('');
    }

    // NOVA: Lógica Sênior para o efeito de inclinação 3D
    addTiltEffect() {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                
                // Calcula a posição do mouse relativa ao centro do card
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                // Define a intensidade da rotação (maior número = menos inclinação)
                const force = 15; 
                
                // Calcula os ângulos de rotação (invertemos o eixo X para naturalidade)
                const rotateX = (mouseY / cardRect.height) * -force;
                const rotateY = (mouseX / cardRect.width) * force;
                
                // Aplica a transformação e a classe de hover
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                card.classList.add('hovering');
            });

            // Reseta o card quando o mouse sai
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
                card.classList.remove('hovering');
            });
        });
    }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const board = new OperatorBoard(operatorsData, 'operators-grid');
    board.init();
    console.log("Senior Dev: Motion experience loaded.");
});