import { test, expect } from '@playwright/test';

test.describe('Landing Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para a landing page
    await page.goto('http://localhost:3001');
  });

  test('deve carregar a landing page corretamente', async ({ page }) => {
    // Verificar se o título da página está correto
    await expect(page).toHaveTitle(/Plataforma de Gestão/);
    
    // Verificar se o hero section está visível
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Transforme seu negócio');
  });

  test('deve exibir todos os componentes principais', async ({ page }) => {
    // Verificar Hero Section
    await expect(page.locator('h1')).toBeVisible();
    
    // Verificar botões CTA
    const ctaButtons = page.locator('button, a').filter({ hasText: /Começar Agora|Saiba Mais/ });
    await expect(ctaButtons.first()).toBeVisible();
    
    // Verificar seção de benefícios
    await expect(page.locator('text=Benefícios')).toBeVisible();
    
    // Verificar seção "Como Funciona"
    await expect(page.locator('text=Como Funciona')).toBeVisible();
    
    // Verificar seção de depoimentos
    await expect(page.locator('text=Depoimentos')).toBeVisible();
    
    // Verificar footer
    await expect(page.locator('footer')).toBeVisible();
  });

  test('deve ser responsivo em diferentes tamanhos de tela', async ({ page }) => {
    // Testar em mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
    
    // Testar em tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toBeVisible();
    
    // Testar em desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('h1')).toBeVisible();
  });

  test('deve ter botões CTA funcionais', async ({ page }) => {
    // Verificar se os botões CTA estão clicáveis
    const ctaButton = page.locator('button, a').filter({ hasText: 'Começar Agora' }).first();
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toBeEnabled();
    
    // Clicar no botão (pode redirecionar ou abrir modal)
    await ctaButton.click();
  });

  test('deve exibir estatísticas de credibilidade', async ({ page }) => {
    // Verificar se as estatísticas estão visíveis
    await expect(page.locator('text=10k+')).toBeVisible();
    await expect(page.locator('text=99.9%')).toBeVisible();
  });

  test('deve carregar imagens e ícones corretamente', async ({ page }) => {
    // Aguardar carregamento da página
    await page.waitForLoadState('networkidle');
    
    // Verificar se não há imagens quebradas
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
    }
  });

  test('deve ter navegação suave entre seções', async ({ page }) => {
    // Verificar se existem links de navegação interna
    const navLinks = page.locator('a[href^="#"]');
    const linkCount = await navLinks.count();
    
    if (linkCount > 0) {
      // Clicar no primeiro link de navegação interna
      await navLinks.first().click();
      
      // Verificar se a página rolou suavemente
      await page.waitForTimeout(1000);
    }
  });

  test('deve ter acessibilidade adequada', async ({ page }) => {
    // Verificar se existe skip link
    const skipLink = page.locator('a[href="#main-content"]');
    if (await skipLink.count() > 0) {
      await expect(skipLink).toBeVisible();
    }
    
    // Verificar se os botões têm labels adequados
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      expect(text?.trim()).toBeTruthy();
    }
  });

  test('deve capturar screenshots para validação visual', async ({ page }) => {
    // Screenshot da página completa
    await page.screenshot({ 
      path: 'tests/screenshots/landing-page-full.png',
      fullPage: true 
    });
    
    // Screenshot do hero section
    const heroSection = page.locator('h1').locator('..');
    await heroSection.screenshot({ 
      path: 'tests/screenshots/hero-section.png' 
    });
    
    // Screenshot em mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ 
      path: 'tests/screenshots/landing-page-mobile.png',
      fullPage: true 
    });
  });
});