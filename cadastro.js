const botao = document.getElementById('btnCadastrar');

//cadastrar
botao.addEventListener('click',
    function () {
        let produtos = JSON.parse(localStorage.getItem("produtos")) || []; //le o texto salvo no localStorage e transforma em um array de objts, se estiver vazio transforma em array vazio

        const produto = { //criando um json com os valores digitados no input nome e preço
            nome: document.getElementById('nome').value,
            preco: document.getElementById('preco').value
        }

        if (!produto.nome.trim() || !produto.preco.trim()) {
            alert("Preencha todos os campos!");
            return;
        }

        const indexEditando = document.getElementById('indexEditar').value; //pega o valor do input de editar

        if (indexEditando !== "") {
            produtos[indexEditando] = produto;
            document.getElementById('indexEditar').value = ""; //zerando o input de editar
        } else {
            produtos.push(produto); //add o produto criado no fim do array;
        }

        let listaDeProdutos = JSON.stringify(produtos); //transforma o array em texto json
        localStorage.setItem("produtos", listaDeProdutos); //salvando a lista de produtos no localStorage

        document.getElementById('nome').value = ""; //zerando os inputs
        document.getElementById('preco').value = "";

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