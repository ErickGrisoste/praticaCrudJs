const botao = document.getElementById('btnCadastrar');

//cadastrar
botao.addEventListener('click',
    function () {
        let produtos = JSON.parse(localStorage.getItem("produtos")) || []; //le o texto salvo no localStorage e transforma em um array de objts, se estiver vazio transforma em array vazio
        const inputNome = document.getElementById('nome');
        const inputPreco = document.getElementById('preco');

        const produto = { //criando um json com os valores digitados no input nome e preço
            nome: document.getElementById('nome').value,
            preco: document.getElementById('preco').value
        }

        const preco = parseFloat(document.getElementById('preco').value);

        if (!produto.nome.trim() || !produto.preco.trim()) { //evita que salve se os valores estiverem vazios
            inputNome.value === "" ? inputNome.style.border = "1px solid red" : inputNome.style.border = "";
            inputPreco.value === "" ? inputPreco.style.border = "1px solid red" : inputPreco.style.border = "";
            alert("Preencha todos os campos!");
            return;
        } else if(produtos.some(p => (p.nome.trim() === produto.nome.trim()) && p.preco === produto.preco)){ //impede cadastro de produtos repetidos
            alert("Produto já existente na tabela. Tente novamente.");

            inputNome.style.border = "1px solid red";
            inputPreco.style.border = "1px solid red";
            
            return;
        } else if(isNaN(preco) || preco <= 0){ //verifica se o preço é um número e se é maior que 0
            alert("Preço inválido!");

            inputPreco.style.border = "1px solid red";

            return;
        }

        const indexEditando = document.getElementById('indexEditar').value; //pega o valor do input de editar
        const sucesso = document.getElementById('msg-sucesso');
        sucesso.innerHTML = "";

        if (indexEditando !== "") {
            produtos[indexEditando] = produto;
            document.getElementById('indexEditar').value = ""; //zerando o input de editar
            const msg = document.createElement('p');
            msg.innerHTML = `Produto <strong>${produto.nome}</strong> editado com sucesso!`; //criando uma mensagem de sucesso
            sucesso.appendChild(msg);
        } else {
            produtos.push(produto); //add o produto criado no fim do array;
            const msg = document.createElement('p');
            msg.innerHTML = `Produto <strong>${produto.nome}</strong> cadastrado com sucesso!`; //criando uma mensagem de sucesso
            sucesso.appendChild(msg);
        }

        let listaDeProdutos = JSON.stringify(produtos); //transforma o array em texto json
        localStorage.setItem("produtos", listaDeProdutos); //salvando a lista de produtos no localStorage

        document.getElementById('nome').value = ""; //zerando os inputs
        document.getElementById('preco').value = "";
        inputNome.style.border = ""; //zerando as bordas de erro
        inputPreco.style.border = "";
        botao.innerText = "Cadastrar";
        
        listar();
    }
);

function listar() {
    const listaDeProdutosCad = JSON.parse(localStorage.getItem("produtos")) || [];
    const tabelaDeProdutos = document.getElementById('listaDeProdutos');
    tabelaDeProdutos.innerHTML = ""; //limpa a tabela

    //pra cada produto cria uma linha na tabela com nome, preço, botão de editar e botão de excluir
    listaDeProdutosCad.forEach((produto, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco}</td>
            <td>
                <button onclick="editarProduto(${index})" class="btn-Editar">Editar</button>
                <button onclick="excluirProduto(${index})" class="btn-Excluir">Excluir</button>
            </td>
        `;
        tabelaDeProdutos.appendChild(linha);
    });
}

function editarProduto(index) {
    botao.innerText = "Salvar Edição";
    const listaDeProdutosCad = JSON.parse(localStorage.getItem("produtos")) || [];
    const produto = listaDeProdutosCad[index];
    //preenchendo os inputs com os valores do produto que vai ser editado
    document.getElementById('nome').value = produto.nome;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('indexEditar').value = index;
}

function excluirProduto(index) {
    const listaDeProdutosCad = JSON.parse(localStorage.getItem("produtos")) || [];

    if (confirm("Deseja excluir produto?")) {
        listaDeProdutosCad.splice(index, 1); //remove o produto do array a partir do index 
        listaJson = JSON.stringify(listaDeProdutosCad);
        localStorage.setItem("produtos", listaJson); //salvo uma nova lista sem o produto excluído
        listar();
    }
}

listar();