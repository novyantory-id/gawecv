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
}
