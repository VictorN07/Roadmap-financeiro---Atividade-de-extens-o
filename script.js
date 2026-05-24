function updateTimelineVisuals() {
    // 1. Pega todos os 7 passos da tela
    const items = document.querySelectorAll('.step-item');
    let lastCompletedIndex = -1;

    // 2. Passa de passo em passo checando se está salvo como "concluído"
    items.forEach((item, index) => {
        const stepNum = index + 1;
        const isCompleted = localStorage.getItem('step-' + stepNum) === 'true';

        if (isCompleted) {
            item.classList.add('completed');
            lastCompletedIndex = index; // Guarda o índice do último passo feito
        } else {
            item.classList.remove('completed');
        }
    });

    // 3. Controla o tamanho da linha roxa ativa
    const activeLine = document.getElementById('progressBar');
    
    if (lastCompletedIndex === -1) {
        // Nenhum passo concluído ainda = linha zerada
        activeLine.style.height = '0%';
    } else {
        // Cálculo matemático para esticar a linha proporcionalmente
        // Se o passo 1 foi feito: (0 / 6) * 100 = 0% (fica no primeiro círculo)
        // Se o passo 4 foi feito: (3 / 6) * 100 = 50% (vai até a metade)
        // Se o passo 7 foi feito: (6 / 6) * 100 = 100% (preenche tudo)
        const totalItems = items.length;
        let percentage = (lastCompletedIndex / (totalItems - 1)) * 100;
        activeLine.style.height = percentage + '%';
    }
}

// Função executada quando o usuário clica na imagem/link do vídeo
function completeStep(number) {
    // Salva no banco de dados local do navegador do usuário
    localStorage.setItem('step-' + number, 'true');
    
    // Um pequeno atraso de 300ms antes de atualizar o visual.
    // Isso dá tempo para o link abrir na nova aba sem travar a animação da linha descendo.
    setTimeout(updateTimelineVisuals, 300);
}

// Assim que a página carregar por completo, renderiza o progresso salvo
window.onload = updateTimelineVisuals;