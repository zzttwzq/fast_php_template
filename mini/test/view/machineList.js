describe('pages/login/login.vue', () => {
	let page;
	beforeAll(async () => {
		page = await program.reLaunch('../machine/machineList');
		await page.waitFor(1000)
	});

	it('模拟删除', async () => {
		await program.callUniMethod('showToast', { title: "模拟删除" });
		await page.waitFor(2000);
		let btn2 = (await page.$$('.btn2'))[0];
		console.log(btn2);
		btn2.tap();
		let systemInfo = await program.systemInfo();
		expect(1 + 1).toBe(2);
		await page.waitFor(1000);
		// expect(await (await page.$('.input')).property('value')).toBe('18254188610');
	});

	// it('模拟删除提示框（确定）', async () => {
	// 	await program.callUniMethod('showToast', { title: "模拟删除提示框（确定）" });
	// 	await page.waitFor(4000);
	// 	let uniButtonColor = (await page.$$('.uni-button-color'))[0];
	// 	console.log(uniButtonColor);
	// 	uniButtonColor.tap();
	// 	let systemInfo = await program.systemInfo();
	// 	expect(1 + 1).toBe(2);
	// 	await page.waitFor(1000);
	// 	// expect(await (await page.$('.input')).property('value')).toBe('18254188610');
	// });
});