# 🚀 Site Profissional Animma - Versão Elite (v4.0)

Este projeto é um site estático de alta performance, otimizado para **SEO local**, **Conversão (CRO)** e **Conformidade total com a LGPD**. Desenvolvido sem frameworks, garantindo velocidade máxima e facilidade de hospedagem.

## ✨ Melhorias de Elite Implementadas
1. **Core Web Vitals**: `fetchpriority="high"` no Hero, `decoding="async"` e `loading="lazy"` otimizados.
2. **Acessibilidade (A11y)**: Atributos `aria`, `prefers-reduced-motion` e contraste WCAG AA.
3. **UX Mobile**: Botão flutuante do WhatsApp é *oculto no mobile* para não conflitar com a Barra de Ação Fixa (Sticky Bar), eliminando oclusão de tela.
4. **Formulário Inteligente**: Validação em tempo real, salvamento de rascunho no LocalStorage e geração de mensagem de WhatsApp ultra-personalizada com dados de UTM.
5. **Segurança**: Todos os links externos possuem `rel="noopener noreferrer"`.

## ⚙️ CONFIGURAÇÃO PRÉ-LANÇAMENTO (Obrigatório)

1. **Substitua os Placeholders de Marketing** no `index.html` (Use Ctrl+Shift+F no VS Code):
   - `[INSIRA SEU GA4 ID AQUI]` (Ex: `G-XXXXXXXXXX`)
   - `[INSIRA SEU ADS ID AQUI]` (Ex: `AW-XXXXXXXXX`)
   - `[INSIRA SEU GTM ID AQUI]` (Ex: `GTM-XXXXXXX`)
   - `[INSIRA SEU META PIXEL ID AQUI]` (Ex: `123456789012345`)

2. **Imagens Reais**: Substitua os URLs do Unsplash por fotos reais da fachada e acervo da Animma na Lilia 43 para aumentar a confiança local.

3. **Hospedagem Gratuita e Rápida**:
   - Arraste a pasta do projeto para o **Netlify Drop** ou faça deploy via **Vercel** / **GitHub Pages**. Não requer backend.

## ✅ Checklist de Testes de Qualidade

- [ ] **Teste de UTM**: Acesse `seusite.com/?utm_source=instagram&utm_campaign=promo`. Preencha o formulário. Ao ser redirecionado ao WhatsApp, a mensagem deve conter: "*(Origem: Fonte: instagram | Mídia: none | Campanha: promo)*".
- [ ] **Teste Mobile**: Abra no celular. A barra fixa "Ligar / WhatsApp" deve aparecer. O botão flutuante verde **não** deve aparecer (para não cobrir a barra).
- [ ] **Teste de Cookies**: Abra em aba anônima. O banner deve aparecer. Clique em "Rejeitar". Abra o DevTools (F12) > Application > Cookies. Verifique se `cookie_consent=rejected` foi salvo.
- [ ] **Teste de Formulário**: Tente enviar com campos vazios. As mensagens de erro em vermelho devem aparecer. Preencha corretamente e verifique o Modal de sucesso.
- [ ] **Teste de Tema**: Clique no ícone da lua/sol. Recarregue a página. O tema escolhido deve persistir.