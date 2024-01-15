/** @odoo-module */

import { registry } from "@web/core/registry"
import { formView } from "@web/views/form/form_view"
import { FormController } from "@web/views/form/form_controller"
const { useEffect } = owl

class SaleOrderFormController extends FormController {
    setup(){
        console.log("Sale order form inherited!")
        //this.props.preventEdit = true
        super.setup()

        useEffect(()=>{
            //console.log(this.model.root.data.state)
            this.disableForm()
        }, ()=>[this.model.root.data.state])

        this.onNotebookPageChange = (notebookId, page) => {
            this.disableForm()
        };
    }

    disableForm(){
        const inputElements = document.querySelectorAll(".o_form_sheet input")
        const fieldWidgets = document.querySelectorAll(".o_form_sheet .o_field_widget")

        const cancelled = this.model.root.data.state == 'draft'

        if (cancelled){
            if (inputElements) inputElements.forEach(e => e.setAttribute("disabled", 1))
            if (fieldWidgets) fieldWidgets.forEach(e => e.classList.add("pe-none"))
            this.canEdit = false
        } else {
            if (inputElements) inputElements.forEach(e => e.removeAttribute("disabled"))
            if (fieldWidgets) fieldWidgets.forEach(e => e.classList.remove("pe-none"))
            this.canEdit = true
        }
    }

    async beforeLeave() {
        if (this.model.root.data.state == 'draft') return
        super.beforeLeave()
    }

    async beforeUnload(ev) {
        if (this.model.root.data.state == 'draft') return
        super.beforeUnload(ev)
    }
}

const saleOrderFormView = {
    ...formView,
    Controller: SaleOrderFormController,
}

registry.category("views").add("sale_order_form_disable", saleOrderFormView)