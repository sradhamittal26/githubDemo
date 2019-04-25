<template>
	<div class="container-fluid bg-image">
		<div class="container">
			<div class="col-md-12 text-center logo-image">
				<img src="../assets/logo.svg" class="mt-5">
			</div>
			<div class="row mt-5">
				<div class="col-md-4 text-center align-self-center d-md-none d-block mb-2">
					<p class="api-hits-text mb-0">API Hits:<span class="font-weight-normal"> {{ apiHitCount }}</span>
					</p>
				</div>
				<div class="col-md-4 sorting-select-control">
					<label for="sorting" class="sortby-style">Sort By</label>
					<select class="form-control" id="sorting" v-model="currentOrder">
						<option selected value="default">Ratings</option>
						<option value="rating">According to Rating</option>
						<option value="price">According to Price</option>
					</select>
				</div>
				<div class="col-md-4 text-center align-self-center d-md-block d-none">
					<p class="api-hits-text mb-0">API Hits:<span class="font-weight-normal"> {{ apiHitCount }}</span>
					</p>
				</div>
				<div class="col-md-4 input-control mt-3 mt-md-0">
					<label for="search" class="search-style">Search</label>
					<input type="text" class="form-control" id="search" placeholder="please enter the product name" v-model="search">
				</div>
			</div>
			<div class="row mt-4">
				<div class="card-columns padding-bottom-30 px-3">
					<div class="card text-center mb-4" v-for="(data, index) in filterProducts" :key="index">
						<img class="item-image py-5" alt="item" :src="data.image">
						<div class="card-body">
							<p class="card-text item-name px-4">{{ data.name }}</p>
							<p class="item-price text-center"> 
                <span class="original-price" :class="{ hidden: data.discountPercentage == null }">Rs. {{ data.orginalPrice }}</span>
								<span class="discounted-price ml-1 mr-1">{{ data.orginalPrice - (data.discountPercentage*data.orginalPrice/100) }}</span>  
                <span class="discount-percentage" :class="{ hidden: data.discountPercentage == null }">{{ data.discountPercentage }}% Off</span>
							</p>
							<p class="user-rating text-center mb-0"> 
               <star-rating v-model="data.rating" :increment="0.5" :read-only="true"  
               :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
							</p>
						</div>
					</div>
				</div>
				<div class="col-md-12 footer text-center my-5">
					<hr class="horizontal-line">
					<p class="footer-text mt-5">&#9400; Rupeek Fintech Pvt Ltd. All rights reserved</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'assignment',
	data() {
		return {
      currentOrder: 'value',
      search: '',
      products: [],
      apiHitCount:Number,
		}
  },
  
	methods: {
		get() {
      var count = 0;
      this.apiHitCount = localStorage.getItem('apiCount');
      if( this.apiHitCount === null){
         localStorage.setItem('apiCount', 1);
         count = 1;
      }
      else{
        count = this.apiHitCount;
      }
			this.$http.get('http://www.mocky.io/v2/5c8b92a4360000cd198f81b4')
				.then((response) => {
          this.products = response.data;
          count++;
          localStorage.setItem('apiCount',count);
        })
      },
    },
	mounted() {
    this.get();
	},
   computed: {
    filterProducts() {
      return this.products.filter(data => {
        return data.name.toLowerCase().match(this.search.toLowerCase());
      })
    }
  },
}
</script>


<style scoped>
.bg-image {
	background: url('../assets/bg.jpg');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	height: auto;
}

.logo-image img {
	height: 30px;
}
.hidden{
  display: none;
}
.sortby-style,
.search-style {
	color: #fff;
	font-size: 14px;
	font-weight: 500;
}

.sorting-select-control select {
	background: transparent;
	height: 44px;
	font-size: 13px;
	color: #ccc;
	border: 1px solid rgba(255, 255, 255, 0.25);
	-webkit-appearance: none;
	background-image: url("../assets/down.png");
	background-repeat: no-repeat;
	background-position: 96%;
	background-size: 15px 15px;
}

.api-hits-text {
	color: #fff;
	font-size: 14px;
	font-weight: 600;
}

.input-control input {
	background: transparent;
	border: 1px solid rgba(255, 255, 255, 0.25);
	height: 44px;
	color: #fff;
	font-size: 14px;
}

.input-control input::placeholder {
	font-size: 13px;
	color: #ccc;
}

.form-control:focus {
	outline: none;
	box-shadow: none;
}

.item-image {
	height: 200px;
	margin: 0 auto;
}

.card:nth-of-type(even) .item-image {
	height: 300px;
	padding-top: 110px !important;
	padding-bottom: 80px !important;
}
.item-name {
	font-size: 12px;
	font-weight: 500;
	color: #000;
}

.item-price span {
	font-size: 14px;
}

.discounted-price {
	font-weight: 700;
}

.user-rating .checked {
	color: orange;
}

.discount-percentage {
	border: 1px solid #ddd;
	border-radius: 2px;
	padding: 2px 5px;
	color: #d2d2d2;
	font-weight: 500;
}

.original-price {
	color: #ccc;
	font-weight: 500;
}

.footer-text {
	color: #fff;
	font-size: 14px;
}

.horizontal-line {
	background-color: #ccc;
	width: 15%;
	color: #ccc;
}

.padding-bottom-30 {
	padding-bottom: 30px;
}

.unfilled-star {
	color: #ddd;
}

.font-weight-normal {
	font-weight: normal;
}
@media (max-width:576px) {
	.customize-card:nth-of-type(even) .item-image {
		height: 200px;
		padding-top: 3rem !important;
		padding-bottom: 3rem !important;
	}
	.customize-card:nth-child(4),
	.customize-card:nth-child(6) {
		margin-top: 0px;
	}
	.horizontal-line {
		width: 50%;
	}
}
</style>