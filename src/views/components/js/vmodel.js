// import { computed } from 'vue'
// export function useModelWrapper(props, emit, name = 'modelValue') { 
//   return computed({ 
//     get: () => props[name], 
//     set: (value) => emit(`update:${name}`, value) 
//   })
// }

import { computed } from 'vue';
class Vmodel {
    modelIO(props, emit, name = 'modelValue') {
        return computed({
            get: () => props[name],
            set: (value) => emit(`update:${name}`, value)
        });
    }
}

export default new Vmodel();