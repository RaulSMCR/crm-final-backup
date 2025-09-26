from playwright.sync_api import sync_playwright, expect, TimeoutError as PlaywrightTimeoutError

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the services page
        page.goto("http://localhost:3000/servicios")

        # Take an initial screenshot for debugging
        page.screenshot(path="jules-scratch/verification/00_initial_page.png")

        # Save the initial HTML content for debugging
        with open("jules-scratch/verification/initial_page.html", "w") as f:
            f.write(page.content())

        # Wait for the main heading to be visible
        expect(page.get_by_role("heading", name="Nuestros Servicios")).to_be_visible(timeout=10000)

        # Take a screenshot of the service categories page
        page.screenshot(path="jules-scratch/verification/01_services_page.png")

        # Find the "Psicología" service card and click the link within it
        psicologia_card = page.locator("div.bg-white:has(h3:text('Psicología'))")
        expect(psicologia_card).to_be_visible()

        ver_profesionales_link = psicologia_card.get_by_role("link", name="Ver Profesionales")
        ver_profesionales_link.click()

        # Wait for the professionals page to load by checking for the new heading
        expect(page.get_by_role("heading", name="Profesionales en Psicología")).to_be_visible()

        # Take a screenshot of the professionals list page
        page.screenshot(path="jules-scratch/verification/02_professionals_page.png")

        print("Verification script finished successfully.")

    except PlaywrightTimeoutError as e:
        print(f"A timeout error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error_screenshot.png")
        with open("jules-scratch/verification/error_page.html", "w") as f:
            f.write(page.content())
        print("An error screenshot and HTML content have been saved for debugging.")

    finally:
        # Clean up
        context.close()
        browser.close()


with sync_playwright() as playwright:
    run_verification(playwright)