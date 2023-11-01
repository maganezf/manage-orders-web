import { test } from '@playwright/test';

test.describe('<SignUp />', async () => {
  test('create waiter account', async ({ page }) => {
    await page.goto('http://localhost:5173/sign-up');

    await page.getByRole('button', { name: 'Criar conta' }).click();

    await page.getByPlaceholder('Nome do usuário').click();
    await page.getByPlaceholder('Nome do usuário').fill('maganez');

    await page.getByPlaceholder('Senha').click();
    await page.getByPlaceholder('Senha').fill('123');

    await page.getByRole('button', { name: 'Criar conta' }).click();

    page.getByText("The waiter 'maganez' was created successfully");
  });

  test('login with created account', async ({ page }) => {
    await page.goto('http://localhost:5173/sign-in');

    await page.getByPlaceholder('Nome do usuário').click();
    await page.getByPlaceholder('Nome do usuário').fill('maganez');
    await page.getByPlaceholder('Senha').click();
    await page.getByPlaceholder('Senha').fill('123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.goto('http://localhost:5173/');

    page.getByText('Login made successfully');
    page.getByText('Got all orders successfully');
  });

  test('opening listing categories page', async ({ page }) => {
    // login with created account

    await page.goto('http://localhost:5173/sign-in');

    await page.getByPlaceholder('Nome do usuário').click();
    await page.getByPlaceholder('Nome do usuário').fill('maganez');
    await page.getByPlaceholder('Senha').click();
    await page.getByPlaceholder('Senha').fill('123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.goto('http://localhost:5173/');

    page.getByText('Login made successfully');
    page.getByText('Got all orders successfully');

    // opening listing categories page

    await page.goto('http://localhost:5173/categories');

    page.getByText('Got all categories successfully');
    page.getByText('Categorias', { exact: true });
  });

  test('opening listing products page', async ({ page }) => {
    // login with created account

    await page.goto('http://localhost:5173/sign-in');

    await page.getByPlaceholder('Nome do usuário').click();
    await page.getByPlaceholder('Nome do usuário').fill('maganez');
    await page.getByPlaceholder('Senha').click();
    await page.getByPlaceholder('Senha').fill('123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.goto('http://localhost:5173/');

    page.getByText('Login made successfully');
    page.getByText('Got all orders successfully');

    // opening listing products page

    await page.goto('http://localhost:5173/products');

    page.getByText('Got all products successfully');
    page.getByText('Produtos', { exact: true });
  });

  test('opening listing orders page', async ({ page }) => {
    // login with created account

    await page.goto('http://localhost:5173/sign-in');

    await page.getByPlaceholder('Nome do usuário').click();
    await page.getByPlaceholder('Nome do usuário').fill('maganez');
    await page.getByPlaceholder('Senha').click();
    await page.getByPlaceholder('Senha').fill('123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.goto('http://localhost:5173/');

    page.getByText('Login made successfully');
    page.getByText('Got all orders successfully');

    // opening listing orders page

    await page.goto('http://localhost:5173/orders');

    page.getByText('Got all orders successfully');
    page.getByText('Pedidos', { exact: true });
  });

  test('creating one category', async ({ page }) => {
    // login with created account

    await page.goto('http://localhost:5173/sign-in');

    await page.getByPlaceholder('Nome do usuário').click();
    await page.getByPlaceholder('Nome do usuário').fill('maganez');
    await page.getByPlaceholder('Senha').click();
    await page.getByPlaceholder('Senha').fill('123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.goto('http://localhost:5173/');

    page.getByText('Login made successfully');
    page.getByText('Got all orders successfully');

    // opening listing categories page

    await page.goto('http://localhost:5173/categories');

    page.getByText('Got all categories successfully');
    page.getByText('Categorias', { exact: true });

    // creating one category

    await page.goto('http://localhost:5173/create-new-category');

    await page.waitForTimeout(1000);

    // await page.waitForSelector('input[placeholder="Nome"]');

    // const inputNameLocator = page.locator('input[placeholder="Nome"]');
    // await inputNameLocator.waitFor();

    const inputName = page.getByPlaceholder('Nome');
    await inputName.click();
    await inputName.fill('Categoria exemplo');

    await page.waitForTimeout(1000);

    // await page.waitForSelector('input[placeholder="Descrição"]');

    const inputDescription = page.getByPlaceholder('Descrição');
    await inputDescription.click();
    await inputDescription.fill('desc categoria exemplo');

    page.getByRole('button', { name: 'Criar categoria' });
    await page.getByRole('button', { name: 'Criar categoria' }).click();

    page.getByText("The category 'Categoria exemplo' was created successfully");
  });

  test('creating one product', async ({ page }) => {
    await page.goto('http://localhost:5173/products');

    await page.getByRole('button', { name: 'Novo produto' }).click();

    await page.getByPlaceholder('Nome').click();
    await page.getByPlaceholder('Nome').fill('Produto exemplo');

    await page.getByPlaceholder('Descrição').click();
    await page.getByPlaceholder('Descrição').fill('desc produto exemplo');

    await page.getByPlaceholder('Preço (R$)').click();
    await page.getByPlaceholder('Preço (R$)').fill('12');

    await page
      .getByRole('combobox')
      .selectOption({ label: 'Categoria exemplo' });

    await page.getByRole('button', { name: 'Criar produto' }).click();
    page.getByText("The product 'Produto exemplo' was created successfully");
  });

  test('creating one order', async ({ page }) => {
    await page.getByRole('button', { name: 'Novo pedido' }).click();

    await page.getByPlaceholder('Número da mesa').fill('5');
    await page.getByRole('combobox').selectOption({ label: 'Produto exemplo' });
    await page.getByPlaceholder('Nome do cliente').fill('Joaquim');

    await page.getByRole('button', { name: 'Criar pedido' }).click();
    page.getByText(
      "The order from the customer 'Joaquim' was created successfully"
    );
  });

  test('showing created order on the homepage', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    page.getByText('Cliente: Joaquim');
    page.getByText('Mesa: 5');
    page.getByText('Pedido: Produto exemplo');
  });

  test('make logout', async ({ page }) => {
    // login with created account

    await page.goto('http://localhost:5173/sign-in');

    await page.getByPlaceholder('Nome do usuário').click();
    await page.getByPlaceholder('Nome do usuário').fill('maganez');
    await page.getByPlaceholder('Senha').click();
    await page.getByPlaceholder('Senha').fill('123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.goto('http://localhost:5173/');

    page.getByText('Login made successfully');
    page.getByText('Got all orders successfully');

    // logout
    await page.goto('http://localhost:5173/');
    await page.getByRole('img', { name: 'ícone de sair' }).click();

    await page.goto('http://localhost:5173/sign-in');
  });
});
