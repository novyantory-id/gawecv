class Organization {
  constructor() {
    this.organizations = this.getOrganizations();
  }
  getOrganizations() {
    return JSON.parse(localStorage.getItem("organizations")) || [];
  }

  saveOrganization(organizationData) {
    const newOrganizationData = {
      id: Date.now(),
      ...organizationData,
    };

    this.organizations.push(newOrganizationData);

    localStorage.setItem("organizations", JSON.stringify(this.organizations));

    return {
      success: true,
    };
  }

  updateOrganization(id, newData) {
    const organizations = this.getOrganizations();
    const index = organizations.findIndex((item) => item.id == id);

    if (index === -1) {
      console.log("Data tidak ditemukan: ", id);
    }

    this.organizations[index] = newData;
    this.updateLocalStorage();
  }

  deleteOrganization(idDelete) {
    const organizations = this.getOrganizations();
    const index = organizations.findIndex((item) => item.id == idDelete);

    if (index === -1) {
      console.log("ID tidak ditemukan ", idDelete);
      return {
        success: false,
        message: "Organization tidak ditemukan",
      };
    }

    this.organizations.splice(index, 1);
    this.updateLocalStorage();

    return {
      success: true,
      message: "Organization berhasil dihapus!",
    };
  }

  updateLocalStorage() {
    localStorage.setItem("organizations", JSON.stringify(this.organizations));
  }
}
