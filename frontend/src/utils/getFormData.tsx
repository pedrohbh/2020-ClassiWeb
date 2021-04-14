export default function getFormData(event) {
    const inputs = Object.values(event.target);
    const formData: any = inputs
      .filter((el: any) => ["INPUT","TEXTAREA"].includes(el.tagName) && el.id)
      .reduce((data: any, input: any) => ({...data, [input.id]: input.value}), {});

    return formData;
}