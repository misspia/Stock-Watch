var companies = JSON.parse(data);

function filterData(query) {
	var filteredCompanies = [];
	for (var i = 0; i < companies.length; i++) {
		if (query === companies.Symbol || companies.Name) {
			return;
		}
	}
}