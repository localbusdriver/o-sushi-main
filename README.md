This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Kindo APIs  
### Auth (get session)  
https://shop.tgcl.co.nz/shop/tgweb.aspx  
> Query Params (?):  
> > ?path=/sessions  
> > path: /sessions  
> Headers:  
> > Referer = https://shop.tgcl.co.nz/app/login  
> > Content-Type = application/x-www-form-urlencoded;charset=UTF-8  
> Body *(x-www-form-urlenconded)*:  
> > email = weemikyung@hotmail.com  
> > password = j...a  

**Returned Cookies:**  
- name: ezysessions.shop.tgcl.co.nz  
- Value: *668d2a8cce6c8b007adc574cb760a0f5*  
- Domain: shop.tgcl.co.nz  
- path: /shop  
- Expires: Session  
- httpsOnly: false  
- Secure: true  
  
### Product stock list (order status > view orders) [example]
https://shop.tgcl.co.nz/shop/tgweb.aspx  
> Query Params (?):  
> > ?path = %2Fsupplier%2Fosushi%2Forders&start_date=2024-11-13&end_date=2024-11-13&status_list=pending%2Cprocessing%2Ccompleted&non_orders=false  
> > path: /supplier/osushi/orders  
> > start_date: year-month-day  
> > end_date: year-month-date  
> > status_list: pending,processing,completed  
> > non_orders: false  
>  Headers:  
> > method: GET  
> > Referer: https://shop.tgcl.co.nz/app/order-status  
> > Cookie: ezsyssession.shop.tgcl.co.nz=bf992ce823905a2900f194bf636288bc; _ga=GA1.1.1186274636.1732047157; thegrowthcollectivelimited-_zldp=enAQevcBCesINGz8lqNBlOjx8MjRoiW%2FcCoQlPqKqAy0VVpix3EO%2FbwEDN5%2BhEPbIRgzEMc8DME%3D; thegrowthcollectivelimited-_zldt=2fef66af-044b-4863-9b92-d658f0441615-1; isiframeenabled=true; _ga_3Z8BTZRZE4=GS1.1.1732050158.2.1.1732050160.0.0.0  
> > **Note**: **Entire Cookie is required**

### Product Stock List (usual way) [example]
https://shop.tgcl.co.nz/shop/tgweb.aspx  
> Query Params:  
> > ?path=/supplier/osushi/production_list&target_date=2024-11-20&production_list_name=&format=html&all_suppliers=true  
> > path: /supplier/osushi/production_list  
> > target_date: year-month-day  
> > production_list_name: production_list  
> > format: html  
> > **all_suppliers: true**  
> Headers:  
> > :authority: shop.tgcl.co.nz  
> > :method: GET  
> > :path: /shop/tgweb.aspx?path=/supplier/osushi/production_list&target_date=2024-11-20&production_list_name=production_list&format=html  
> > Content-Type: text/html  
> > Cookie: ^^  
> > Referer: https://shop.tgcl.co.nz/shop/supplier.shtml?supplier=osushi&date=2024-11-20&task=production_list  

### Label pdf [example]
https://shop.tgcl.co.nz/shop/tgweb.aspx  
> Query Params:  
> > ?path=/supplier/osushi/label_pdf&target_date=2024-11-20&detail=label_pdf_sop_3x11  
> > path: /supplier/osushi/label_pdf  
> > target_date: 2024-11-20  
> > detail: label_pdf_sop_3x11  
> Headers:  
> > :authority: shop.tgcl.co.nz  
> > :method: GET  
> > :path: /shop/tgweb.aspx?path=/supplier/osushi/label_pdf&target_date=2024-11-20&detail=label_pdf_sop_3x11  
> > Cookie: ^^  
> > Content-Type: text/html  
> > Referer: https://shop.tgcl.co.nz/shop/supplier.shtml?supplier=osushi&date=2024-11-20&task=label_pdf_sop_3x11  

