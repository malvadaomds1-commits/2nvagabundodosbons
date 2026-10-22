# 2N Vagabundo dos Bons

Site estático oficial de 2N Vagabundo dos Bons, feito com HTML, CSS e JavaScript. Não usa backend, PHP, banco de dados, build ou serviços pagos obrigatórios. O mesmo projeto funciona no XAMPP e no GitHub Pages, inclusive em URL de subdiretório.

## Testar no computador

1. Abra `C:\xampp\htdocs\dj2ndanovaholanda\index.html` no navegador; ou
2. Com o XAMPP, inicie o Apache e acesse `http://localhost/dj2ndanovaholanda/`.

Como alternativa, na pasta do projeto rode `python -m http.server 8000` e abra `http://localhost:8000`.

## Personalizar conteúdo

Edite `js/config.js` para configurar os dados públicos:

- `youtube.channelUrl` e `youtube.channelId`: endereço e ID do canal. O ID fica preparado para integração futura com a API oficial; não coloque chaves privadas no site.
- `youtube.featuredVideoId` e `youtube.featuredTitle`: vídeo incorporado em destaque. O player usa o domínio privacy-enhanced do YouTube e só aparece quando um ID válido é informado.
- `featuredRelease` e `releases`: lançamento de destaque e lista de faixas. Use `title`, `date`, `youtubeId` e `cover`; as datas devem seguir `AAAA-MM-DD` e as capas podem ser salvas em `assets/images/`.
- `social`: links de Instagram e TikTok. O canal do YouTube é configurado em `youtube.channelUrl`.
- `contact`: o convite do Discord está configurado. Se preferir, você também pode usar `email` ou `whatsapp` com DDI e DDD, somente números.
- `biography`: texto biográfico confirmado pelo artista.

Campos vazios mostram estados demonstrativos, não criam estatísticas, links nem dados biográficos fictícios. Imagens que você adicionar devem ser otimizadas e ter autorização de uso. Atualize `og:image` em `index.html` caso substitua a arte de compartilhamento.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub, por exemplo `dj-2n-nova-holanda`.
2. Envie os arquivos e pastas desta pasta para a raiz do repositório. `index.html` precisa permanecer na raiz.
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**, selecione a branch principal (`main`) e a pasta `/(root)`, e salve.
5. Aguarde a publicação e use o endereço exibido na área Pages.

Os caminhos de CSS, JavaScript, favicon e imagens são relativos, então funcionam tanto na raiz quanto em um subdiretório do GitHub Pages. Este projeto não depende de um domínio ou nome de repositório específico.

## Estrutura

```text
index.html
css/style.css
js/main.js
js/config.js
assets/images/og-cover.svg
favicon.svg
README.md
```

Google Fonts é um aprimoramento visual remoto; se não carregar, o site usa fontes locais de reserva. A integração com dados do YouTube é manual neste momento. Uma chave de API, caso a integração seja implementada futuramente, deve ficar em um serviço de backend/proxy protegido, nunca em `config.js` público.
