function contactForm() {
      return {
        formData: {
          _name: '',
          _replyto: '',
          message: ''
        },
        message: '',
        loading: false,
        buttonLabel: 'SUBMIT',
        submitData() {
          this.buttonLabel = 'Submitting...';
          this.loading = true;
          this.message = '';
          fetch('https://hooks.zapier.com/hooks/catch/4705006/7ydo0k/', {
            mode: 'no-cors',     
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.formData)
          })
            .then(() => {
              this.message = 'Nice form submission ;)';
              this.formData._name = '';
              this.formData._replyto = '';
              this.formData.message = '';  
            })
            .catch(() => {
              this.message = 'Ooops! Something went wrong!';
            })
            .finally(() => {
              this.loading = false;
              this.buttonLabel = 'Submit'
            })
        }//end submitData
      }//end return
    }//end contactForm
