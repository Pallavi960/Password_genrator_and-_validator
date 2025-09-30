   function openTab(tabName, evt) {
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      document.getElementById(tabName).classList.add('active');
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      evt.currentTarget.classList.add('active');
    }

    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?/~`";

    function generatePassword() {
      const length = Number(document.getElementById('length').value);
      const useLower = document.getElementById('includeLowercase').checked;
      const useUpper = document.getElementById('includeUppercase').checked;
      const useNumbers = document.getElementById('includeNumbers').checked;
      const useSymbols = document.getElementById('includeSymbols').checked;
      const personal = document.getElementById('personalInput').value.trim();

      let charset = "";
      if (useLower) charset += lower;
      if (useUpper) charset += upper;
      if (useNumbers) charset += numbers;
      if (useSymbols) charset += symbols;
      if (charset === "") { alert("Select at least one character type!"); return; }

      let password = "";

      if (personal !== "") {
        // Smart personalized password
        const words = personal.split(" ");
        let base = words.map(w => {
          let c = w[0];
          if (useUpper) c = c.toUpperCase();
          else if (useLower) c = c.toLowerCase();
          return c;
        }).join("");

        // Fill base if too short
        while (base.length < Math.ceil(length / 2)) {
          base += charset[Math.floor(Math.random() * charset.length)];
        }

        for (let i = 0; i < length; i++) {
          if (i % 2 === 0 && i < base.length) password += base[i];
          else password += charset[Math.floor(Math.random() * charset.length)];
        }
      } else {
        for (let i = 0; i < length; i++) {
          password += charset[Math.floor(Math.random() * charset.length)];
        }
      }

      document.getElementById('generatedPassword').value = password;
      updateStrength(password, 'strength');
    }

    function copyPassword() {
      const pass = document.getElementById('generatedPassword');
      pass.select();
      pass.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(pass.value);
      alert("Password copied!");
    }

    function validatePassword() {
      const pass = document.getElementById('passwordInput').value;
      updateStrength(pass, 'validation');
    }

    function updateStrength(password, type) {
      let score = 0;
      if (password.length >= 8) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[a-z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[\!\@\#\$\%\^\&\*\(\)\_\+\[\]\{\}\|\;\:\,\.<>\/\?~`]/.test(password)) score++;

      let strengthText = "", color = "", width = (score / 5) * 100;
      if (score <= 2) { strengthText = "Weak ❌"; color = "red"; }
      else if (score <= 4) { strengthText = "Medium ⚠️"; color = "orange"; }
      else { strengthText = "Strong ✅"; color = "green"; }

      if (type === 'strength') {
        document.getElementById('strengthText').innerText = strengthText;
        document.getElementById('strengthBar').style.width = width + "%";
        document.getElementById('strengthBar').style.background = color;
      } else {
        document.getElementById('validationFeedback').innerText = strengthText;
        document.getElementById('validationBar').style.width = width + "%";
        document.getElementById('validationBar').style.background = color;
      }
    }
