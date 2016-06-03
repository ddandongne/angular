import { Tree, TreeNode } from './utils/tree';
import { shallowEqual } from './utils/collection';
import { UrlSegment } from './url_tree';
import { PRIMARY_OUTLET } from './shared';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export class RouterState extends Tree {
    constructor(root, queryParams, fragment, snapshot) {
        super(root);
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.snapshot = snapshot;
    }
}
export function createEmptyState(rootComponent) {
    const snapshot = createEmptyStateSnapshot(rootComponent);
    const emptyUrl = new BehaviorSubject([new UrlSegment("", {}, PRIMARY_OUTLET)]);
    const emptyParams = new BehaviorSubject({});
    const emptyQueryParams = new BehaviorSubject({});
    const fragment = new BehaviorSubject("");
    const activated = new ActivatedRoute(emptyUrl, emptyParams, PRIMARY_OUTLET, rootComponent, snapshot.root);
    activated.snapshot = snapshot.root;
    return new RouterState(new TreeNode(activated, []), emptyQueryParams, fragment, snapshot);
}
function createEmptyStateSnapshot(rootComponent) {
    const rootUrlSegment = new UrlSegment("", {}, PRIMARY_OUTLET);
    const emptyUrl = [rootUrlSegment];
    const emptyParams = {};
    const emptyQueryParams = {};
    const fragment = "";
    const activated = new ActivatedRouteSnapshot(emptyUrl, emptyParams, PRIMARY_OUTLET, rootComponent, null, rootUrlSegment);
    return new RouterStateSnapshot(new TreeNode(activated, []), emptyQueryParams, fragment);
}
export class ActivatedRoute {
    constructor(urlSegments, params, outlet, component, futureSnapshot) {
        this.urlSegments = urlSegments;
        this.params = params;
        this.outlet = outlet;
        this.component = component;
        this._futureSnapshot = futureSnapshot;
    }
}
export class ActivatedRouteSnapshot {
    constructor(urlSegments, params, outlet, component, routeConfig, lastUrlSegment) {
        this.urlSegments = urlSegments;
        this.params = params;
        this.outlet = outlet;
        this.component = component;
        this._routeConfig = routeConfig;
        this._lastUrlSegment = lastUrlSegment;
    }
}
export class RouterStateSnapshot extends Tree {
    constructor(root, queryParams, fragment) {
        super(root);
        this.queryParams = queryParams;
        this.fragment = fragment;
    }
}
export function advanceActivatedRoute(route) {
    if (route.snapshot && !shallowEqual(route.snapshot.params, route._futureSnapshot.params)) {
        route.snapshot = route._futureSnapshot;
        route.urlSegments.next(route.snapshot.urlSegments);
        route.params.next(route.snapshot.params);
    }
    else {
        route.snapshot = route._futureSnapshot;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3N0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcl9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjO09BQ3RDLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CO09BQzFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWTtPQUVoQyxFQUFVLGNBQWMsRUFBRSxNQUFNLFVBQVU7T0FFMUMsRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0I7QUFrQnRELGlDQUFpQyxJQUFJO0lBSW5DLFlBQVksSUFBOEIsRUFBUyxXQUErQixFQUFTLFFBQTRCLEVBQVMsUUFBNkI7UUFDM0osTUFBTSxJQUFJLENBQUMsQ0FBQztRQURxQyxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUFTLGFBQVEsR0FBUixRQUFRLENBQXFCO0lBRTdKLENBQUM7QUFDSCxDQUFDO0FBRUQsaUNBQWlDLGFBQW1CO0lBQ2xELE1BQU0sUUFBUSxHQUFHLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sUUFBUSxHQUFHLElBQUksZUFBZSxDQUFDLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0UsTUFBTSxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqRCxNQUFNLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFHLFNBQVMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztJQUNuQyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxRQUFRLENBQWlCLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDNUcsQ0FBQztBQUVELGtDQUFrQyxhQUFtQjtJQUNuRCxNQUFNLGNBQWMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzlELE1BQU0sUUFBUSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbEMsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQzVCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNwQixNQUFNLFNBQVMsR0FBRyxJQUFJLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDekgsTUFBTSxDQUFDLElBQUksbUJBQW1CLENBQUMsSUFBSSxRQUFRLENBQXlCLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsSCxDQUFDO0FBZ0JEO0lBUUUsWUFBbUIsV0FBcUMsRUFDckMsTUFBMEIsRUFDMUIsTUFBYyxFQUNkLFNBQXdCLEVBQy9CLGNBQXNDO1FBSi9CLGdCQUFXLEdBQVgsV0FBVyxDQUEwQjtRQUNyQyxXQUFNLEdBQU4sTUFBTSxDQUFvQjtRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsY0FBUyxHQUFULFNBQVMsQ0FBZTtRQUd6QyxJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztJQUN4QyxDQUFDO0FBQ0gsQ0FBQztBQWVEO0lBZUUsWUFBbUIsV0FBeUIsRUFDekIsTUFBYyxFQUNkLE1BQWMsRUFDZCxTQUF3QixFQUMvQixXQUF5QixFQUN6QixjQUEwQjtRQUxuQixnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUN6QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGNBQVMsR0FBVCxTQUFTLENBQWU7UUFHekMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7SUFDeEMsQ0FBQztBQUNILENBQUM7QUFlRCx5Q0FBeUMsSUFBSTtJQUkzQyxZQUFZLElBQXNDLEVBQVMsV0FBbUIsRUFBUyxRQUF1QjtRQUM1RyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBRDZDLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBZTtJQUU5RyxDQUFDO0FBQ0gsQ0FBQztBQU9ELHNDQUFzQyxLQUFxQjtJQUN6RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQztRQUNqQyxLQUFLLENBQUMsV0FBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELEtBQUssQ0FBQyxNQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDO0lBQ3pDLENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJlZSwgVHJlZU5vZGUgfSBmcm9tICcuL3V0aWxzL3RyZWUnO1xuaW1wb3J0IHsgc2hhbGxvd0VxdWFsIH0gZnJvbSAnLi91dGlscy9jb2xsZWN0aW9uJztcbmltcG9ydCB7IFVybFNlZ21lbnQgfSBmcm9tICcuL3VybF90cmVlJztcbmltcG9ydCB7IFJvdXRlIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgUGFyYW1zLCBQUklNQVJZX09VVExFVCB9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgVHlwZSwgQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRoZSBzdGF0ZSBvZiB0aGUgcm91dGVyLlxuICpcbiAqICMjIyBVc2FnZVxuICpcbiAqIGBgYFxuICogY2xhc3MgTXlDb21wb25lbnQge1xuICogICBjb25zdHJ1Y3Rvcihyb3V0ZXI6IFJvdXRlcikge1xuICogICAgIGNvbnN0IHN0YXRlID0gcm91dGVyLnJvdXRlclN0YXRlO1xuICogICAgIGNvbnN0IGlkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBzdGF0ZS5maXJzdENoaWxkKHN0YXRlLnJvb3QpLnBhcmFtcy5tYXAocCA9PiBwLmlkKTtcbiAqICAgICBjb25zdCBpc0RlYnVnOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBzdGF0ZS5xdWVyeVBhcmFtcy5tYXAocSA9PiBxLmRlYnVnKTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBSb3V0ZXJTdGF0ZSBleHRlbmRzIFRyZWU8QWN0aXZhdGVkUm91dGU+IHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY29uc3RydWN0b3Iocm9vdDogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGU+LCBwdWJsaWMgcXVlcnlQYXJhbXM6IE9ic2VydmFibGU8UGFyYW1zPiwgcHVibGljIGZyYWdtZW50OiBPYnNlcnZhYmxlPHN0cmluZz4sIHB1YmxpYyBzbmFwc2hvdDogUm91dGVyU3RhdGVTbmFwc2hvdCkge1xuICAgIHN1cGVyKHJvb3QpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbXB0eVN0YXRlKHJvb3RDb21wb25lbnQ6IFR5cGUpOiBSb3V0ZXJTdGF0ZSB7XG4gIGNvbnN0IHNuYXBzaG90ID0gY3JlYXRlRW1wdHlTdGF0ZVNuYXBzaG90KHJvb3RDb21wb25lbnQpO1xuICBjb25zdCBlbXB0eVVybCA9IG5ldyBCZWhhdmlvclN1YmplY3QoW25ldyBVcmxTZWdtZW50KFwiXCIsIHt9LCBQUklNQVJZX09VVExFVCldKTtcbiAgY29uc3QgZW1wdHlQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcbiAgY29uc3QgZW1wdHlRdWVyeVBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe30pO1xuICBjb25zdCBmcmFnbWVudCA9IG5ldyBCZWhhdmlvclN1YmplY3QoXCJcIik7XG4gIGNvbnN0IGFjdGl2YXRlZCA9IG5ldyBBY3RpdmF0ZWRSb3V0ZShlbXB0eVVybCwgZW1wdHlQYXJhbXMsIFBSSU1BUllfT1VUTEVULCByb290Q29tcG9uZW50LCBzbmFwc2hvdC5yb290KTtcbiAgYWN0aXZhdGVkLnNuYXBzaG90ID0gc25hcHNob3Qucm9vdDtcbiAgcmV0dXJuIG5ldyBSb3V0ZXJTdGF0ZShuZXcgVHJlZU5vZGU8QWN0aXZhdGVkUm91dGU+KGFjdGl2YXRlZCwgW10pLCBlbXB0eVF1ZXJ5UGFyYW1zLCBmcmFnbWVudCwgc25hcHNob3QpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbXB0eVN0YXRlU25hcHNob3Qocm9vdENvbXBvbmVudDogVHlwZSk6IFJvdXRlclN0YXRlU25hcHNob3Qge1xuICBjb25zdCByb290VXJsU2VnbWVudCA9IG5ldyBVcmxTZWdtZW50KFwiXCIsIHt9LCBQUklNQVJZX09VVExFVCk7XG4gIGNvbnN0IGVtcHR5VXJsID0gW3Jvb3RVcmxTZWdtZW50XTtcbiAgY29uc3QgZW1wdHlQYXJhbXMgPSB7fTtcbiAgY29uc3QgZW1wdHlRdWVyeVBhcmFtcyA9IHt9O1xuICBjb25zdCBmcmFnbWVudCA9IFwiXCI7XG4gIGNvbnN0IGFjdGl2YXRlZCA9IG5ldyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KGVtcHR5VXJsLCBlbXB0eVBhcmFtcywgUFJJTUFSWV9PVVRMRVQsIHJvb3RDb21wb25lbnQsIG51bGwsIHJvb3RVcmxTZWdtZW50KTtcbiAgcmV0dXJuIG5ldyBSb3V0ZXJTdGF0ZVNuYXBzaG90KG5ldyBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PihhY3RpdmF0ZWQsIFtdKSwgZW1wdHlRdWVyeVBhcmFtcywgZnJhZ21lbnQpO1xufVxuXG4vKipcbiAqIENvbnRhaW5zIHRoZSBpbmZvcm1hdGlvbiBhYm91dCBhIGNvbXBvbmVudCBsb2FkZWQgaW4gYW4gb3V0bGV0LiBUaGUgaW5mb3JtYXRpb24gaXMgcHJvdmlkZWQgdGhyb3VnaFxuICogdGhlIHBhcmFtcyBhbmQgdXJsU2VnbWVudHMgb2JzZXJ2YWJsZXMuXG4gKlxuICogIyMjIFVzYWdlXG4gKlxuICogYGBgXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIGNvbnN0cnVjdG9yKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICogICAgIGNvbnN0IGlkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSByb3V0ZS5wYXJhbXMubWFwKHAgPT4gcC5pZCk7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgQWN0aXZhdGVkUm91dGUge1xuICAvKiogQGludGVybmFsICovXG4gIF9mdXR1cmVTbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdDtcbiAgc25hcHNob3Q6IEFjdGl2YXRlZFJvdXRlU25hcHNob3Q7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIHVybFNlZ21lbnRzOiBPYnNlcnZhYmxlPFVybFNlZ21lbnRbXT4sXG4gICAgICAgICAgICAgIHB1YmxpYyBwYXJhbXM6IE9ic2VydmFibGU8UGFyYW1zPixcbiAgICAgICAgICAgICAgcHVibGljIG91dGxldDogc3RyaW5nLFxuICAgICAgICAgICAgICBwdWJsaWMgY29tcG9uZW50OiBUeXBlIHwgc3RyaW5nLFxuICAgICAgICAgICAgICBmdXR1cmVTbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdFxuICApIHtcbiAgICB0aGlzLl9mdXR1cmVTbmFwc2hvdCA9IGZ1dHVyZVNuYXBzaG90O1xuICB9XG59XG5cbi8qKlxuICogQ29udGFpbnMgdGhlIGluZm9ybWF0aW9uIGFib3V0IGEgY29tcG9uZW50IGxvYWRlZCBpbiBhbiBvdXRsZXQgYXQgYSBwYXJ0aWN1bGFyIG1vbWVudCBpbiB0aW1lLlxuICpcbiAqICMjIyBVc2FnZVxuICpcbiAqIGBgYFxuICogY2xhc3MgTXlDb21wb25lbnQge1xuICogICBjb25zdHJ1Y3Rvcihyb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcbiAqICAgICBjb25zdCBpZDogc3RyaW5nID0gcm91dGUuc25hcHNob3QucGFyYW1zLmlkO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIEFjdGl2YXRlZFJvdXRlU25hcHNob3Qge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfcmVzb2x2ZWRDb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PGFueT47XG4gIFxuICAvKiogQGludGVybmFsICoqL1xuICBfcm91dGVDb25maWc6IFJvdXRlIHwgbnVsbDtcblxuICAvKiogQGludGVybmFsICoqL1xuICBfbGFzdFVybFNlZ21lbnQ6IFVybFNlZ21lbnQ7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIHVybFNlZ21lbnRzOiBVcmxTZWdtZW50W10sXG4gICAgICAgICAgICAgIHB1YmxpYyBwYXJhbXM6IFBhcmFtcyxcbiAgICAgICAgICAgICAgcHVibGljIG91dGxldDogc3RyaW5nLFxuICAgICAgICAgICAgICBwdWJsaWMgY29tcG9uZW50OiBUeXBlIHwgc3RyaW5nLCBcbiAgICAgICAgICAgICAgcm91dGVDb25maWc6IFJvdXRlIHwgbnVsbCxcbiAgICAgICAgICAgICAgbGFzdFVybFNlZ21lbnQ6IFVybFNlZ21lbnQpIHtcbiAgICB0aGlzLl9yb3V0ZUNvbmZpZyA9IHJvdXRlQ29uZmlnO1xuICAgIHRoaXMuX2xhc3RVcmxTZWdtZW50ID0gbGFzdFVybFNlZ21lbnQ7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgc3RhdGUgb2YgdGhlIHJvdXRlciBhdCBhIHBhcnRpY3VsYXIgbW9tZW50IGluIHRpbWUuXG4gKlxuICogIyMjIFVzYWdlXG4gKlxuICogYGBgXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyKSB7XG4gKiAgICAgY29uc3Qgc25hcHNob3QgPSByb3V0ZXIucm91dGVyU3RhdGUuc25hcHNob3Q7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgUm91dGVyU3RhdGVTbmFwc2hvdCBleHRlbmRzIFRyZWU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD4ge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihyb290OiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PiwgcHVibGljIHF1ZXJ5UGFyYW1zOiBQYXJhbXMsIHB1YmxpYyBmcmFnbWVudDogc3RyaW5nIHwgbnVsbCkge1xuICAgIHN1cGVyKHJvb3QpO1xuICB9XG59XG5cbi8qKlxuICogVGhlIGV4cGVjdGF0aW9uIGlzIHRoYXQgdGhlIGFjdGl2YXRlIHJvdXRlIGlzIGNyZWF0ZWQgd2l0aCB0aGUgcmlnaHQgc2V0IG9mIHBhcmFtZXRlcnMuXG4gKiBTbyB3ZSBwdXNoIG5ldyB2YWx1ZXMgaW50byB0aGUgb2JzZXJ2YWJsZXMgb25seSB3aGVuIHRoZXkgYXJlIG5vdCB0aGUgaW5pdGlhbCB2YWx1ZXMuXG4gKiBBbmQgd2UgZGV0ZWN0IHRoYXQgYnkgY2hlY2tpbmcgaWYgdGhlIHNuYXBzaG90IGZpZWxkIGlzIHNldC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkdmFuY2VBY3RpdmF0ZWRSb3V0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGUpOiB2b2lkIHtcbiAgaWYgKHJvdXRlLnNuYXBzaG90ICYmICFzaGFsbG93RXF1YWwocm91dGUuc25hcHNob3QucGFyYW1zLCByb3V0ZS5fZnV0dXJlU25hcHNob3QucGFyYW1zKSkge1xuICAgIHJvdXRlLnNuYXBzaG90ID0gcm91dGUuX2Z1dHVyZVNuYXBzaG90O1xuICAgICg8YW55PnJvdXRlLnVybFNlZ21lbnRzKS5uZXh0KHJvdXRlLnNuYXBzaG90LnVybFNlZ21lbnRzKTtcbiAgICAoPGFueT5yb3V0ZS5wYXJhbXMpLm5leHQocm91dGUuc25hcHNob3QucGFyYW1zKTtcbiAgfSBlbHNlIHtcbiAgICByb3V0ZS5zbmFwc2hvdCA9IHJvdXRlLl9mdXR1cmVTbmFwc2hvdDtcbiAgfVxufSJdfQ==