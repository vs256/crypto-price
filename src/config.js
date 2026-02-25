export const config = {
    apiBase: "https://api.kucoin.com/api/v1/",
    iconsPath: ".\\icons\\",
}

export const answer = {
    wait: {
        title: 'Waiting for the coin',
        subtitle: 'Example: BTC',
        iconPath: `${config.iconsPath}loading.svg`
    },
    notFound: {
        title: 'Not found',
        subtitle: 'Insert correct query',
        iconPath: `${config.iconsPath}error.svg`
    },
    error : (err) => {
        return {
            title: err.toString(),
            method: 'copy_result',
            params: [err.toString()],
            iconPath: `${config.iconsPath}warningerror.svg`
        }
    }
}