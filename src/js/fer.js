const verificarBtn = document.getElementById("verificarBtn");
const emailInput = document.getElementById("email");
const resultado = document.getElementById("resultado");

verificarBtn.addEventListener("click", async () => {

    const email = emailInput.value.trim();

    if (!email) {
        resultado.className = "resultado-erro";
        resultado.textContent = "Digite um e-mail.";
        return;
    }

    resultado.className = "resultado-erro";
    resultado.textContent = "Consultando vazamentos...";

    try {

        const emailCodificado = encodeURIComponent(email);

        const resposta = await fetch(
            `https://api.xposedornot.com/v1/breach-analytics?email=${emailCodificado}`
        );

        const dados = await resposta.json();

        console.log(dados);

        if (
            dados.ExposedBreaches &&
            dados.ExposedBreaches.breaches_details
        ) {

            const vazamentos =
                dados.ExposedBreaches.breaches_details;

            resultado.className = "resultado-sucesso";

            resultado.innerHTML = `
                <h3>E-mail encontrado!</h3>

                <p>
                    Foram encontrados
                    <strong>${vazamentos.length}</strong>
                    vazamento(s).
                </p>

                <div class="lista-vazamentos">

                    ${vazamentos.map(vazamento => `

                        <div class="vazamento">

                            <h4>${vazamento.breach}</h4>

                            <p>
                                <strong>Site:</strong>
                                ${vazamento.domain || "Não informado"}
                            </p>

                            <p>
                                <strong>Data:</strong>
                                ${vazamento.xposed_date || "Não informada"}
                            </p>

                            <p>
                                <strong>Registros expostos:</strong>
                                ${vazamento.xposed_records || "Não informado"}
                            </p>

                            <p>
                                <strong>Dados expostos:</strong>
                                ${vazamento.xposed_data || "Não informado"}
                            </p>

                            <p>
                                <strong>Descrição:</strong>
                                ${vazamento.details || "Não disponível"}
                            </p>

                        </div>

                    `).join("")}

                </div>
            `;

        } else {

            resultado.className = "resultado-seguro";

            resultado.innerHTML = `
                <strong>Nenhum vazamento encontrado.</strong>
                <p>
                    O e-mail não foi encontrado na base consultada.
                </p>
            `;
        }

    } catch (erro) {

        console.error(erro);

        resultado.className = "resultado-erro";

        resultado.textContent =
            "Não foi possível consultar o e-mail.";
    }
});
