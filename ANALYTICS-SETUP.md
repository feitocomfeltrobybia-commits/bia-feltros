# 📊 Configuração do Google Analytics 4

O código do Google Analytics 4 já está instalado em todas as páginas do site. Agora você precisa obter seu ID de medição e ativá-lo.

## 🚀 Passo a Passo

### 1. Criar conta no Google Analytics
1. Acesse: https://analytics.google.com/
2. Clique em "Começar a medir" (ou "Start measuring")
3. Crie uma conta (escolha um nome, ex: "Ateliê Bia Feltros")

### 2. Configurar a propriedade
1. Nome da propriedade: "Ateliê Bia Feltros Website"
2. Fuso horário: Brasil (GMT-3)
3. Moeda: Real (BRL)

### 3. Criar um fluxo de dados
1. Escolha "Web"
2. URL do site: `https://SEU-USUARIO.github.io/portal` (substitua pelo seu)
3. Nome do fluxo: "Portal Ateliê Bia Feltros"

### 4. Copiar o ID de medição
Após criar, você verá um código como: **G-XXXXXXXXXX**

### 5. Substituir no código
Abra cada arquivo HTML e substitua **GA4_MEASUREMENT_ID** pelo seu ID real:

**Arquivos a editar:**
- `index.html`
- `products.html`
- `about.html`
- `contact.html`

**Procure por:** `GA4_MEASUREMENT_ID`  
**Substitua por:** `G-XXXXXXXXXX` (seu ID real)

Você pode usar o atalho `Cmd+Shift+F` no VS Code para buscar em todos os arquivos.

### 6. Fazer commit e push
```bash
git add .
git commit -m "Add Google Analytics 4 tracking"
git push origin main
```

## 📈 Como Ver os Dados

1. Acesse: https://analytics.google.com/
2. Selecione sua propriedade
3. Navegue por:
   - **Relatórios** → Visão geral de tráfego
   - **Explorar** → Criar relatórios personalizados
   - **Tempo real** → Ver visitantes online agora

### Métricas disponíveis:
- ✅ Número de visitantes (usuários)
- ✅ Visualizações de página
- ✅ Páginas mais visitadas
- ✅ Origem do tráfego (Google, redes sociais, direto)
- ✅ Localização geográfica
- ✅ Dispositivos (mobile, desktop, tablet)
- ✅ Tempo médio na página

## ⏱️ Quando os dados aparecem?

- **Tempo real**: Imediato (após ativar)
- **Relatórios**: Podem levar até 24h para começar a aparecer dados históricos

## 🔒 Privacidade

O Google Analytics está em conformidade com LGPD, mas você pode adicionar um aviso de cookies/privacidade no rodapé do site se desejar.

## 💡 Dica Extra

Você pode criar um **atalho no celular** para acompanhar os acessos rapidamente:
1. Abra analytics.google.com no Safari/Chrome mobile
2. Adicione à tela inicial

---

**Problemas?** Verifique se:
- O ID está correto (formato G-XXXXXXXXXX)
- O site já está no ar (GitHub Pages)
- Os arquivos foram commitados e enviados ao GitHub
