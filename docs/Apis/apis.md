# APIs utilizadas

## XposedOrNot

### Descrição

A **XposedOrNot API** é uma API gratuita utilizada para verificar se um endereço de e-mail apareceu em algum vazamento de dados conhecido.

Ela pode ser utilizada em projetos de segurança da informação para criar ferramentas educativas de verificação de exposição de e-mails.

### Documentação oficial

https://xposedornot.com/api_doc

### API

https://api.xposedornot.com

---

## Verificar e-mail

### Endpoint

```text
GET https://api.xposedornot.com/v1/check-email/{email}
```

### Exemplo

```text
https://api.xposedornot.com/v1/check-email/test@example.com
```

### API Key

Não é necessária para esse endpoint.

### Parâmetro

| Parâmetro | Tipo   | Obrigatório | Descrição                              |
| --------- | ------ | ----------- | -------------------------------------- |
| `email`   | string | Sim         | Endereço de e-mail que será consultado |

---

## Exemplo de resposta

Quando o e-mail é encontrado em vazamentos:

```json
{
    "breaches": [
        [
            "Adobe",
            "LinkedIn"
        ]
    ],
    "email": "test@example.com",
    "status": "success"
}
```

O campo `breaches` contém os nomes dos vazamentos encontrados.

---

## Quando nenhum vazamento é encontrado

A API pode retornar:

```json
{
    "Error": "Not found",
    "email": null
}
```

Isso significa que o e-mail não foi encontrado na base consultada.

**Importante:** isso não significa que o e-mail nunca sofreu um vazamento. Significa apenas que nenhum vazamento correspondente foi encontrado na base consultada.

---

## Exemplo em JavaScript

```javascript
async function verificarEmail() {

    const email = document.getElementById("email").value.trim();

    const resultado = document.getElementById("resultado");

    if (!email) {
        resultado.innerHTML = "Digite um e-mail.";
        return;
    }

    resultado.innerHTML = "🔎 Verificando...";

    try {

        const url =
            `https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email)}`;

        const resposta = await fetch(url);

        const dados = await resposta.json();

        console.log("Resposta da API:", dados);

        if (dados.breaches && dados.breaches.length > 0) {

            const vazamentos = dados.breaches.flat();

            resultado.innerHTML = `
                <h3>⚠️ E-mail encontrado!</h3>

                <p>
                    Este e-mail apareceu em
                    <strong>${vazamentos.length}</strong>
                    vazamentos conhecidos.
                </p>
            `;

        } else {

            resultado.innerHTML = `
                <h3>✅ Nenhum vazamento encontrado</h3>

                <p>
                    Esse e-mail não foi encontrado
                    na base consultada.
                </p>
            `;
        }

    } catch (erro) {

        console.error("Erro:", erro);

        resultado.innerHTML = `
            <h3>❌ Erro na consulta<
``` }
