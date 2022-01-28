export function emailValidator(control) {
    const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}
export function matchingPasswords(passwordKey, passwordConfirmationKey) {
    return (group) => {
        const password = group.controls[passwordKey];
        const passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({ mismatchedPasswords: true });
        }
    };
}
export function validateExpirationDate(expiredMonth, expiredYear) {
    return (group) => {
        const expiredMonthCtr = group.controls[expiredMonth];
        const expiredYearCtr = group.controls[expiredYear];
        if (!expiredMonthCtr.value || !expiredYearCtr.value) {
            expiredMonthCtr.setErrors({ expiredMonth: true });
            expiredYearCtr.setErrors({ expiredYear: true });
            return true;
        }
        let month = expiredMonthCtr.value;
        let year = expiredYearCtr.value;
        month = parseInt(month, 10).toString();
        year = parseInt(year, 10).toString();
        if (/^\d+$/.test(month) &&
            /^\d+$/.test(year) &&
            month >= 1 &&
            month <= 12) {
            const expiry = new Date(year, month);
            const currentTime = new Date();
            expiry.setMonth(expiry.getMonth() - 1);
            expiry.setMonth(expiry.getMonth() + 1, 1);
            if (expiry > currentTime) {
                expiredMonthCtr.setErrors(null);
                expiredYearCtr.setErrors(null);
                return null;
            }
        }
        expiredMonthCtr.setErrors({ expiredMonth: true });
        expiredYearCtr.setErrors({ expiredYear: true });
        return true;
    };
}
export function resetForm(from) {
    from.reset();
    Object.keys(from.controls).forEach((key) => {
        from.controls[key].setErrors(null);
    });
}
export function markFormGroupTouched(from) {
    Object.values(from.controls).forEach(control => {
        control.markAsTouched();
        if (control.controls) {
            markFormGroupTouched(control);
        }
    });
}
export function passwordValidator(control) {
    if (!control.value) {
        return null;
    }
    if (control.value.match(/^(?=.*?[A-Z])[a-zA-Z0-9!@#$%^&*](?=.*?[#?!@$%^&*-]).{6,}$/)) {
        return null;
    }
    else {
        return { invalidPassword: true };
    }
}
export function phoneValidator(control) {
    if (!control.value) {
        return null;
    }
    if (control.value.match('^((\\+-?)|0)?[0-9](?=.*?[-])?.{9,}$')) {
        return null;
    }
    else {
        return { pattern: true };
    }
}
export function markFormGroupEnabled(from) {
    Object.values(from.controls).forEach(control => {
        control.enable();
    });
}
export function markFormGroupDisabled(from) {
    Object.values(from.controls).forEach(control => {
        control.disable();
    });
}
export function validateSalePrice(isSaleKey, salePriceTypeKey, saleValueKey, priceKey) {
    return (group) => {
        const isSale = group.controls[isSaleKey].value;
        const salePriceType = group.controls[salePriceTypeKey].value;
        const sale = group.controls[saleValueKey];
        sale.setErrors(null);
        if (isSale && sale.value) {
            const price = parseFloat(group.controls[priceKey].value);
            const saleValue = parseFloat(sale.value);
            if (salePriceType === '$' && (saleValue <= 0 || saleValue >= price)) {
                return sale.setErrors({ invalidSaleValuePrice: true });
            }
            else if (salePriceType === '%' && (saleValue <= 0 || saleValue >= 100)) {
                return sale.setErrors({ invalidSaleValuePercent: true });
            }
        }
    };
}
//# sourceMappingURL=app-validators.js.map