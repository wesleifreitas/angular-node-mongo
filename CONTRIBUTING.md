## <a name="commit"></a> Git Commit

Regras para o commit.

### <a name="commit"></a>Commit Message (Formato)
Cada mensagem de commit deve possuir um **header**(obrigatório), e pode conter um **body** e um **footer**.  O header inclui um **type**(obrigatório), um **scope**(obrigatório) e um **subject**(obrigatório):

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Type
Deve ser um destes:

* **feat**: Um novo recurso
* **fix**: Uma correção de bug
* **docs**: Mudanças referentes a documentação
* **style**: Alterações que não afetam o código (espaço em branco, formatação, falta de ponto e vírgula, etc)
* **refactor**: Melhoria de código que não corrige um bug e nem adiciona um novo recurso
* **perf**: Alteração no código que melhora o desempenho
* **chore**: Processo de construção (build) ou ferramentas auxiliares e bibliotecas, tais como geração de documentação.

### Scope
O escopo pode ser qualquer coisa especificando o que o commit está alterando. Por exemplo `login`.

### Subject
Descrição objetiva da mudança:

* use frases no presente e modo imperativo: "alterar" e não "alterado" nem "alterações", por exemplo: `alterar o formulário`
* não utilize letra maiúscula na primeira letra
* não inclua o ponto no final no título

### Body
Assim como o **subject**, utilize frases no presente e modo imperativo.
O body pode descrever a motivação da alteração e comparar seu comportamento atual com a anterior.

### Footer
Considerações finais.
