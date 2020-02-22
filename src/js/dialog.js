async function selectCategory() {
    const { value: category } = await Swal.fire({
        title: 'Welcome to Hang Man game!',
        input: 'select',
        inputOptions: {
          cat1: 'Animals',
          cat2: 'Ferniture',
          cat3: 'Computer Science'
        },
        inputPlaceholder: 'Select category',
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value) {
              resolve()
            } else {
              resolve('Please select a category!')
            }
          })
        }
      })
      
      if (category) {
        console.log(category);
         ;
    }
}
