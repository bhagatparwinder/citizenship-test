import { CitizenshipTestPage } from './app.po';

describe('citizenship-test App', () => {
  let page: CitizenshipTestPage;

  beforeEach(() => {
    page = new CitizenshipTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
