export class Github {
  constructor() {
    this.client_id = "559bf454669ba0f8947e";
    this.client_secret = "553a8dd07775f1e72fd608fb54851919158b9b5f";
    this.per_page = 10;
    this.sort = "asc";
  }

  async fetchUserData(username) {
    const profileRes = await fetch(
      `https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?client_id=${this.client_id}&client_secret=${this.client_secret}&sort=${this.sort}&per_page=${this.per_page}`
    );

    const data = await profileRes.json();
    const repos = await repoRes.json();

    return { data, repos };
  }
}
