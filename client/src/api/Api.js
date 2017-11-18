export const Api = {
    // user
    getUser() {
        return new Promise((resolve, reject) => {
        fetch('/profile')
            .then((res) => {
                res.json()
                    .then((r) => {
                        resolve(r.user);
                    });
            })
            .catch((error) => {
                reject(error);
            });
        });
    }    

    // poll

    // other
}