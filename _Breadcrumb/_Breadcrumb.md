# _Breadcrumb

![_Breadcrumb](breadcrumb.png)

```cshtml
@model List<(string Name, string Url)>

	<style>
		a {
			color: #54565B;
			text-decoration: none;
		}

		a:hover {
			color: #54565B;
		}

		a.active {
			color: #9DA4AE;
		}
	</style>

	<nav class="d-none d-sm-flex" style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
		<ol dir="rtl" class="breadcrumb" style="white-space:nowrap;">
			@for (int i = 0; i < Model.Count; i++) { var item=Model[i]; var isActive=i==Model.Count - 1; <li
				class="breadcrumb-item" aria-current="page">
				<a href="@item.Url" class="@(isActive ? " active" : "" )">@item.Name</a>
				</li>
				}
		</ol>
	</nav>
```

### How to use
```cshtml
define breadcrumb list:
	- last item in the list is active by default
@{
    var breadcrumb = new List<(string Name, string Url)>
    {
        ("الرئيسية", "/"),
        ("الخدمات الإلكترونية", "/services"),
        ("أعمال لجان هيئة الخبراء", "/services/works"),
    };
}

<partial name="_Breadcrumb" model="breadcrumb" />
```