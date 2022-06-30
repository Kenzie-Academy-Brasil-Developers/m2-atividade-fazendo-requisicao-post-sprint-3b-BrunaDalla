# Atividade: Fazendo requisição POST
Antes de realizar essa atividade, faça um colone desse repositorio para ter a estrutra básica do projeto.

## Objetivo
Nessa atividade vamos realizar um cadastro de usuário com requisição POST obtendo os dados por meio de um formulário. 
Utilizaremos a API [ViaCEP](https://viacep.com.br/) e a [API Post](https://gitlab.com/-/snippets/2210411) para realizar o POST.

### Importante!
Anteriormente, você já trabalhou com formulários e nessa atividade utilizaremos esse conhecimento.

## Passo a passo
Vá até o arquivo script.js para começarmos.

1. Construa essa estrutura básica.
```js
const registerForm = document.getElementById("register-form");
function handleSubmit(e) {
  e.preventDefault();
};
registerForm.addEventListener("submit", handleSubmit);
```
2. Agora vamos capturar os dados. Utilizaremos um loop for para percorrer os elementos retornados pela propriedade 'elements'. 
Vamos capturar cada um dos elementos, e criar um atributo em nosso objeto data(inicializado no início do código) utilizando o atributo 'name' e o valor do input. 
Veja no código abaixo: [elements](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements).
```js
const handleSubmit = (e) => {
  e.preventDefault();
  let data = {};
  const elements = registerForm.elements; // Retorna todos os campos de formulário

  for (let i = 0; i < elements.length; i++) {
    let item = elements[i];
    // O "name" é um atributo HTML
    if (item.name !== "") {
      data[item.name] = item.value;
    }

  }
};
```
3. Vamos começar a construir as requisições. A primeira será na API ViaCep, crie uma função assíncrona chamada fetchCep() que faça um GET com o CEP passado no formulário. Mais para frente veremos onde essa função será chamada, por enquanto apenas deixe declarada. Lembre de tratar a possibilidade do usuário enviar um CEP inválido.
4. Após de realizar o passo acima, vamos fazer a requisição POST. Crie uma função assíncrona chamada createUser(), ela terá a responsabilidade registrar o usuário.
5. Agora faça a requisição na API da seguinte forma. É nesse momento que iremos executar a função 'fetchCep' que voce criou no passo 3, vamos substituir o address salvo no objeto data pelo retorno dessa função.:
```js
async function createUser(data) {
  // 1 - Altere o "address" para a resposta da ViaCep
  data.address = await fetchCep(data.address);
  
  // 2 - Faça o fetch
  const response = await fetch(
    "https://api-post-m2.herokuapp.com/auth/register",
    {
      method: "post", // Indica o tipo de requisição GET, POST, PATCH, DELETE
      headers: {
        "Content-Type": "application/json", // Indica o tipo de dado da requisição
      },
      body: JSON.stringify(data), // Informando as informações do usuário
    }
  )
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => error);
  return response;
}
```
Quando precisamos enviar dados adicionais no fetch(), passamos no segundo parâmetro as informações necessárias. Nessa situação passamos dentro de um objeto o método, cabeçalho e corpo da requisição.

6. Retorne na função handleSubmit() e transforme ela em assíncrona. E também chame dentro dela a função createUser().
```js
async function handleSubmit(e) {
  ...
  const response = await createUser(obj);
}
```
## Agora é com você
Faça uma requição GET na API Post utilizando o _id da resposta da função createUser(), como parâmetro de URL. Verifique se os dados foram realmente salvos e mostre eles no documento.

### Dica!
Se tiver alguma dúvida sobre a resposta das requisições, utilize o Insomnia para explorar a API.
### Conteúdo complementar!
[Fornecendo opções de requisição - MDN](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch#fornecendo_op%C3%A7%C3%B5es_de_request)

[Content-Type - MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Content-Type)
