const registerForm = document.getElementById('register-form')

async function handleSubmit(e) {
    e.preventDefault()

    let data = {}

    const elements = registerForm.elements // Retorna todos os campos de formulário

    for (let i = 0; i < elements.length; i++) {
        let item = elements[i]
        // O "name" é um atributo HTML
        if (item.name !== '') {
            data[item.name] = item.value
        }
    }

    const response = await createUser(data)

    const getApiPost = await fetch(`https://m2-api-post.herokuapp.com/api/user/${response['id']}`)
    
}

registerForm.addEventListener('submit', handleSubmit)

async function fetchCep(cep) {
    const urlCep = `https://viacep.com.br/ws/${cep}/json/`

    const responseCep = await fetch(urlCep)
    .then(response => response.json())
    .catch(() => console.log('Cep inválido'))

    return responseCep
}

async function createUser(data) {

    const { cep, logradouro, bairro, localidade, uf } = await fetchCep(data.address)

    data.address = { cep, logradouro, bairro, localidade, uf }

    const response = await fetch(
        "https://m2-api-post.herokuapp.com/api/user",
        {
            method: 'POST', // Indica o tipo de requisição GET, POST, PATCH, DELETE
            headers: {
                'Content-Type': 'application/json', // Indica o tipo de dado da requisição
            },
            body: JSON.stringify(data) // Informando as informações do usuário
        }
    )
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => error)

    return response
}

