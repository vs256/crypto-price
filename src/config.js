export const config = {
    apiBase: "https://api.coingecko.com/api/v3/",
    iconsPath: ".\\icons\\",
}

export const answer = {
    wait: {
        title: 'Waiting for the coin',
        subtitle: 'Example: BTC',
        iconPath: `${config.iconsPath}loading.png`
    },
    notFound: {
        title: 'Not found',
        subtitle: 'Insert correct query',
        iconPath: `${config.iconsPath}error.png`
    },
    error : (err) => {
        return {
            title: err.toString(),
            method: 'copy_result',
            params: [err.toString()],
            iconPath: `${config.iconsPath}error.png`
        }
    }
}