export const settingsService = {
  async getProfile() {
    const cached = localStorage.getItem('transitops_profile');
    return cached ? JSON.parse(cached) : {};
  },

  async updateProfile(data) {
    localStorage.setItem('transitops_profile', JSON.stringify(data));
    return data;
  },

  async getPreferences() {
    const cached = localStorage.getItem('transitops_preferences');
    return cached ? JSON.parse(cached) : null;
  },

  async updatePreferences(data) {
    localStorage.setItem('transitops_preferences', JSON.stringify(data));
    
    // Synchronize the darkTheme preference with the global document root class
    if (data && typeof data.darkTheme === 'boolean') {
      const root = document.documentElement;
      if (data.darkTheme) {
        root.classList.remove('light-mode');
        root.classList.add('dark-mode');
        localStorage.setItem('transitops_theme', 'dark');
      } else {
        root.classList.remove('dark-mode');
        root.classList.add('light-mode');
        localStorage.setItem('transitops_theme', 'light');
      }
    }

    return data;
  },
};
