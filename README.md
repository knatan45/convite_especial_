# Um Convite Fora do Roteiro

Um site-convite romântico, interativo e feito para o celular. A estética é de edição especial de um romance (capa de livro, carta, marcador de página), e a fisioterapia entra como brincadeira, sem nenhuma informação clínica real.

Tudo roda no navegador. Não há backend, login, rastreamento nem coleta de dados: as respostas ficam só na memória da página e somem ao fechar.

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Estrutura das 7 telas e os ícones SVG |
| `styles.css` | Visual, responsividade, animações e acessibilidade |
| `script.js` | Navegação, teste, carta, convite e final |
| `config.js` | **Todos os textos, nomes, opções e cores** (é aqui que você edita) |
| `assets/` | Pasta reservada para imagens e ícones próprios (vazia por padrão; os ícones já estão embutidos em SVG) |

## Como abrir

Dê dois cliques em `index.html`. Funciona direto do disco, sem servidor.

Se preferir um servidor local (opcional):

```bash
python3 -m http.server 8080
# abra http://localhost:8080
```

## Como personalizar

Abra `config.js` em qualquer editor de texto.

- **Nomes:** `nomeVisitante` e `nomeAutor`. Se ficarem vazios (`""`), o site simplesmente não mostra o nome, sem "undefined".
- **Título:** `tituloSite` e `capa.titulo`.
- **Textos:** cada seção tem seu bloco (`capitulo1`, `fisio`, `teste`, `carta`, `convite`, `final`, `cliches`).
- **Opções de encontro:** lista `convite.opcoes`. Cada item tem `id`, `titulo` e `texto`. Mantenha o item com `id: "outro"` se quiser o campo de sugestão livre.
- **Perguntas do teste:** `teste.perguntas`. Cada opção tem um `id` único, e a frase do laudo correspondente fica em `teste.resultadoFrases` (mesma chave do `id`). Se trocar um `id`, troque a chave também.
- **Cores:** bloco `cores` (papel, vinho, rosa, marrom, tinta). Mantenha bom contraste entre texto e fundo.
- **Data e horário:** o site diz que ficam "a combinar". Para mudar, edite `convite.texto` e `final.detalhes.valorData`.

## Imagens e ícones

Os ícones são SVG dentro do `index.html` (bloco `<symbol>` no topo). Para usar uma imagem sua, coloque o arquivo em `assets/` e referencie com caminho relativo, por exemplo `assets/foto.jpg`.

## Testar no celular

1. Com o computador e o celular na mesma rede Wi-Fi, rode `python3 -m http.server 8080` na pasta do projeto.
2. Descubra o IP do computador e abra `http://IP-DO-COMPUTADOR:8080` no celular.
3. Ou hospede a pasta em qualquer serviço de sites estáticos (Netlify, Vercel, GitHub Pages) e mande o link.

## Acessibilidade

Navegação por teclado, foco visível, rótulos para leitores de tela, avisos de status, áreas de toque de 48 px e respeito a `prefers-reduced-motion`.

## Limitações

- Fontes são as do sistema (Georgia, Palatino, etc.), então a aparência varia um pouco entre aparelhos. É proposital, para funcionar sem internet.
- O botão voltar do celular volta de capítulo em capítulo. Ao recarregar a página, a leitura recomeça da capa.
- As respostas não são salvas nem enviadas. Se quiser saber o que ela escolheu, ela precisará te contar.
